import re

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone


STANDARD_TRACKING_STEPS = (
    ("تایید مدارک و RTA", "دفتر امارات"),
    ("ورود به بندر مبدأ", "شارجه / دبی"),
    ("ترخیص و بارگیری", "کشتی و لنج"),
    ("در مسیر دریایی", "خلیج فارس"),
    ("ورود به گمرک", "بندرعباس / لنگه"),
    ("انتقال با خودروبَر", "به سمت منطقه آزاد"),
    ("پارک در پارکینگ", "تحویل نهایی"),
)


phone_number_validator = RegexValidator(
    regex=r"^\+?\d{10,15}$",
    message="Enter a valid phone number containing 10 to 15 digits.",
)


def normalize_phone_number(phone_number):
    return re.sub(r"[\s()-]", "", phone_number)


class AdminUserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, phone_number, password=None, **extra_fields):
        if not phone_number:
            raise ValueError("The phone number is required.")
        user = self.model(
            phone_number=normalize_phone_number(phone_number),
            **extra_fields,
        )
        user.set_password(password) if password else user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        if not password:
            raise ValueError("A superuser must have a password.")
        return self.create_user(phone_number, password, **extra_fields)


class AdminUser(AbstractBaseUser, PermissionsMixin):
    """Staff login model, retained in the tracking app for database compatibility."""

    phone_number = models.CharField(
        max_length=16,
        unique=True,
        validators=[phone_number_validator],
    )
    is_phone_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = AdminUserManager()

    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = "admin user"
        verbose_name_plural = "admin users"
        db_table = "accounts_user"

    def save(self, *args, **kwargs):
        self.phone_number = normalize_phone_number(self.phone_number)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.phone_number


class Shipment(models.Model):
    class CompletedSteps(models.IntegerChoices):
        NONE = 0, "هیچ مرحله‌ای تکمیل نشده"
        DOCUMENTS = 1, "تایید مدارک و RTA"
        ORIGIN_PORT = 2, "ورود به بندر مبدأ"
        LOADING = 3, "ترخیص و بارگیری"
        AT_SEA = 4, "در مسیر دریایی"
        CUSTOMS = 5, "ورود به گمرک"
        VEHICLE_TRANSFER = 6, "انتقال با خودروبَر"
        DELIVERED = 7, "پارک در پارکینگ / تحویل نهایی"

    tracking_code = models.CharField(max_length=100, unique=True, db_index=True)
    car_brand = models.CharField(max_length=100, blank=True)
    car_model = models.CharField(max_length=150)
    build_year = models.CharField(max_length=20, blank=True)
    color = models.CharField(max_length=80, blank=True)
    origin = models.CharField(max_length=200)
    destination = models.CharField(max_length=200)
    estimated_arrival = models.CharField(max_length=150, blank=True)
    customer_note = models.TextField(blank=True)
    completed_steps = models.PositiveSmallIntegerField(
        choices=CompletedSteps.choices,
        default=CompletedSteps.NONE,
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-updated_at",)

    def save(self, *args, **kwargs):
        self.tracking_code = self.tracking_code.strip().upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.tracking_code} - {self.car_brand} {self.car_model}"


class ShipmentDocument(models.Model):
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE, related_name="documents")
    title = models.CharField(max_length=200)
    file = models.FileField(upload_to="shipment_docs/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.shipment.tracking_code}"