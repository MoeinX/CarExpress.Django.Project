from unittest.mock import patch

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import PhoneOTP, User


class OTPAuthenticationAPITests(APITestCase):
    phone_number = "09121234567"
    otp_code = "123456"

    def create_otp(self, phone_number=None, code=None):
        otp = PhoneOTP(phone_number=phone_number or self.phone_number)
        otp.set_code(code or self.otp_code)
        otp.save()
        return otp

    @patch("accounts.views.generate_otp_code", return_value=otp_code)
    def test_existing_user_can_request_login_otp(self, _generate_code):
        User.objects.create_user(self.phone_number)

        response = self.client.post(
            reverse("accounts:generate-otp"),
            {"phone_number": "0912 123 4567"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        otp = PhoneOTP.objects.get(phone_number=self.phone_number)
        self.assertTrue(otp.verify(self.otp_code))

    def test_unknown_user_cannot_request_login_otp(self):
        response = self.client.post(
            reverse("accounts:generate-otp"),
            {"phone_number": self.phone_number},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_valid_otp_returns_jwt_tokens(self):
        user = User.objects.create_user(self.phone_number)
        self.create_otp()

        response = self.client.post(
            reverse("accounts:verify-otp"),
            {
                "phone_number": "0912 123 4567",
                "otp": self.otp_code,
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        user.refresh_from_db()
        self.assertTrue(user.is_phone_verified)

    def test_latest_otp_is_verified(self):
        self.create_otp(code="000000")
        latest_otp = self.create_otp(code=self.otp_code)

        response = self.client.post(
            reverse("accounts:verify-otp"),
            {
                "phone_number": self.phone_number,
                "otp": self.otp_code,
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        latest_otp.refresh_from_db()
        self.assertTrue(latest_otp.is_used)

    def test_otp_must_have_six_digits(self):
        response = self.client.post(
            reverse("accounts:verify-otp"),
            {
                "phone_number": self.phone_number,
                "otp": "12345",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
