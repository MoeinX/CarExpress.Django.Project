import re

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone


TRACKING_STEPS_I18N = {
    "fa": (
        ("تحویل و بارگیری در پورت راشد (دبی)", "پورت راشد دبی - امارات"),
        ("در مسیر ترانزیت دریایی", "آب‌های خلیج فارس / شناور ترابری"),
        ("ورود به بندر مقصد (در انتظار تخلیه)", "تخلیه نشده / لنگرگاه و محوطه گمرک"),
        ("تخلیه کامل و ترخیص از شناور", "تخلیه شده / انبار و تشریفات بندری"),
        ("بارگیری و انتقال با خودروبَر به مقصد", "ماشین روی خودروبَر / حمل زمینی"),
    ),
    "ar": (
        ("الاستلام والتحميل في ميناء راشد (دبي)", "ميناء راشد - دبي"),
        ("في مسار الترانزيت البحري", "مياه الخليج العربي / سفينة الشحن"),
        ("الوصول إلى ميناء الوجهة (بانتظار التفريغ)", "غير مفرغة / المرفأ الجمركي"),
        ("تفريغ وتخليص الشحنة من السفينة", "تم التفريغ / المستودعات الجمركية"),
        ("التحميل والانطلاق بالسطحة نحو الوجهة", "السيارة على السطحة / النقل البري"),
    ),
    "en": (
        ("Port Rashid Handover & Loading (Dubai)", "Port Rashid, Dubai UAE"),
        ("Maritime Transit in Progress", "Persian Gulf Waters / Cargo Vessel"),
        ("Port Arrival (Pending Discharge)", "Undischarged / Customs Dock"),
        ("Discharged & Customs Cleared", "Discharged / Port Terminal"),
        ("Loaded on Car Carrier for Final Dispatch", "On Vehicle Carrier / Land Transit"),
    ),
}

STANDARD_TRACKING_STEPS = TRACKING_STEPS_I18N["fa"]


phone_number_validator = RegexValidator(
    regex=r"^(0\d{10}|9\d{9})$",
    message="Enter a valid Iranian phone number (11 digits starting with 0 or 10 digits starting with 9).",
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
        PORT_RASHID = 1, "تحویل و بارگیری در پورت راشد (دبی)"
        SEA_TRANSIT = 2, "در مسیر ترانزیت دریایی"
        PORT_ARRIVAL = 3, "ورود به بندر مقصد (در انتظار تخلیه)"
        DISCHARGED = 4, "تخلیه کامل و ترخیص از شناور"
        CAR_CARRIER = 5, "بارگیری و انتقال با خودروبَر به مقصد"

    tracking_code = models.CharField(max_length=100, unique=True, db_index=True)
    customer_name = models.CharField(max_length=150, blank=True)
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
    stage_dates = models.JSONField(default=dict, blank=True)
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