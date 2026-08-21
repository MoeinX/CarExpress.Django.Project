from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import AdminUser, Shipment, ShipmentDocument


class TrackingApiTests(APITestCase):
    def setUp(self):
        self.admin = AdminUser.objects.create_superuser(
            phone_number="09121234567",
            password="safe-password",
        )
        self.shipment = Shipment.objects.create(
            tracking_code="TRQ-8902",
            car_model="Toyota Camry 2024",
            color="White",
            origin="Sharjah",
            destination="Kish",
        )
    def test_public_lookup_returns_nested_steps(self):
        response = self.client.get("/api/tracking/trq-8902/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["tracking_code"], "TRQ-8902")
        self.assertEqual(len(response.data["steps"]), 7)
        self.assertEqual(response.data["steps"][0]["status"], "current")

    def test_admin_can_create_shipment(self):
        self.client.force_authenticate(self.admin)
        response = self.client.post(
            "/api/admin/shipments/",
            {
                "tracking_code": "NEW-100",
                "car_model": "BMW X5",
                "origin": "Dubai",
                "destination": "Tehran",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(response.data["steps"]), 7)

    def test_admin_selects_completed_steps_on_shipment(self):
        self.client.force_authenticate(self.admin)
        response = self.client.patch(
            f"/api/admin/shipments/{self.shipment.id}/",
            {"completed_steps": 3},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["steps"][2]["status"], "completed")
        self.assertEqual(response.data["steps"][3]["status"], "current")

    def test_admin_can_save_optional_stage_date(self):
        self.client.force_authenticate(self.admin)
        response = self.client.patch(
            f"/api/admin/shipments/{self.shipment.id}/",
            {"stage_dates": {"2": "2026-08-21T14:30"}},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["steps"][1]["date"], "2026-08-21T14:30")
        self.assertEqual(response.data["steps"][1]["description"], "2026-08-21T14:30")

    def test_admin_can_delete_shipment_document(self):
        document = ShipmentDocument.objects.create(
            shipment=self.shipment,
            title="RTA",
            file=SimpleUploadedFile("rta.txt", b"document content"),
        )
        file_name = document.file.name
        self.client.force_authenticate(self.admin)

        response = self.client.delete(
            f"/api/admin/shipments/{self.shipment.id}/documents/{document.id}/"
        )

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(ShipmentDocument.objects.filter(pk=document.id).exists())
        self.assertFalse(document.file.storage.exists(file_name))

    def test_non_staff_cannot_access_management_api(self):
        user = AdminUser.objects.create_user("09121111111", password="password")
        self.client.force_authenticate(user)
        response = self.client.get("/api/admin/shipments/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_user_add_page_supports_phone_login_model(self):
        self.client.force_authenticate(user=None)
        self.client.force_login(self.admin)
        response = self.client.get("/admin/tracking/adminuser/add/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
