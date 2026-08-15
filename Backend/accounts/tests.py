from datetime import timedelta

from django.test import TestCase
from django.utils import timezone

from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import PhoneOTP, User


class UserModelTests(TestCase):
    def test_user_is_created_with_phone_number(self):
        user = User.objects.create_user("0912 123 4567")

        self.assertEqual(user.phone_number, "09121234567")
        self.assertFalse(user.has_usable_password())

    def test_superuser_has_required_permissions(self):
        user = User.objects.create_superuser("09121234567", "test-password")

        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_phone_verified)

    def test_admin_forms_use_custom_user_model(self):
        self.assertIs(CustomUserCreationForm._meta.model, User)
        self.assertIs(CustomUserChangeForm._meta.model, User)


class PhoneOTPTests(TestCase):
    def create_otp(self, code="123456", **kwargs):
        otp = PhoneOTP(phone_number="09121234567", **kwargs)
        otp.set_code(code)
        otp.save()
        return otp

    def test_correct_code_is_accepted_once(self):
        otp = PhoneOTP(phone_number="0912 123 4567")
        otp.set_code("123456")
        otp.save()

        self.assertEqual(otp.phone_number, "09121234567")
        self.assertTrue(otp.verify("123456"))
        self.assertFalse(otp.verify("123456"))

    def test_expired_code_is_rejected(self):
        otp = self.create_otp(expires_at=timezone.now() - timedelta(seconds=1))

        self.assertFalse(otp.verify("123456"))

    def test_wrong_code_increases_attempt_count(self):
        otp = self.create_otp()

        self.assertFalse(otp.verify("000000"))
        otp.refresh_from_db()
        self.assertEqual(otp.attempts, 1)
