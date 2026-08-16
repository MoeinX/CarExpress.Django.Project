import re
from datetime import timedelta

from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone


phone_number_validator = RegexValidator(
    regex=r"^\+?\d{10,15}$",
    message="Enter a valid phone number containing 10 to 15 digits.",
)


def normalize_phone_number(phone_number):
    return re.sub(r"[\s()-]", "", phone_number)


def default_otp_expiry():
    return timezone.now() + timedelta(minutes=5)


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, phone_number, password=None, **extra_fields):
        if not phone_number:
            raise ValueError("The phone number is required.")

        user = self.model(
            phone_number=normalize_phone_number(phone_number),
            **extra_fields,
        )
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_phone_verified", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("A superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("A superuser must have is_superuser=True.")
        if not password:
            raise ValueError("A superuser must have a password.")

        return self.create_user(phone_number, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    phone_number = models.CharField(
        max_length=16,
        unique=True,
        validators=[phone_number_validator],
    )
    is_phone_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = []

    def save(self, *args, **kwargs):
        self.phone_number = normalize_phone_number(self.phone_number)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.phone_number


class PhoneOTP(models.Model):
    class Purpose(models.TextChoices):
        LOGIN = "login", "Login"
        VERIFY_PHONE = "verify_phone", "Verify phone"

    phone_number = models.CharField(
        max_length=16,
        validators=[phone_number_validator],
        db_index=True,
    )
    code_hash = models.CharField(max_length=128)
    purpose = models.CharField(
        max_length=20,
        choices=Purpose.choices,
        default=Purpose.LOGIN,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(default=default_otp_expiry)
    attempts = models.PositiveSmallIntegerField(default=0)
    max_attempts = models.PositiveSmallIntegerField(default=5)
    is_used = models.BooleanField(default=False)

    class Meta:
        ordering = ("-created_at",)

    def set_code(self, raw_code):
        self.code_hash = make_password(str(raw_code))

    def save(self, *args, **kwargs):
        self.phone_number = normalize_phone_number(self.phone_number)
        super().save(*args, **kwargs)

    @property
    def is_expired(self):
        return timezone.now() >= self.expires_at

    @property
    def can_attempt(self):
        return (
            not self.is_used
            and not self.is_expired
            and self.attempts < self.max_attempts
        )

    def verify(self, raw_code):
        if not self.can_attempt:
            return False

        self.attempts += 1
        is_correct = check_password(str(raw_code), self.code_hash)
        if is_correct:
            self.is_used = True

        self.save(update_fields=("attempts", "is_used"))
        return is_correct

    def __str__(self):
        return f"{self.phone_number} - {self.get_purpose_display()}"
