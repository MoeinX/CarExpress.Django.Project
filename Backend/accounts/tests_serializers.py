from django.test import TestCase

from .models import PhoneOTP, User
from .serializers import PhoneOTPSerializer, UserSerializer


class AccountSerializerTests(TestCase):
    def test_user_serializer_does_not_expose_password_or_permissions(self):
        user = User.objects.create_user("09121234567", "secret-password")

        data = UserSerializer(user).data

        self.assertNotIn("password", data)
        self.assertNotIn("is_staff", data)
        self.assertEqual(data["phone_number"], "09121234567")

    def test_otp_serializer_does_not_expose_code_hash(self):
        otp = PhoneOTP(phone_number="09121234567")
        otp.set_code("123456")
        otp.save()

        data = PhoneOTPSerializer(otp).data

        self.assertNotIn("code_hash", data)
        self.assertIn("can_attempt", data)
