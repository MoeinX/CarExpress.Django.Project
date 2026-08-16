from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import User

from .models import Inquiry
from .serializers import InquirySerializer


def create_inquiry(user, chassis_number="CHASSIS-001"):
    return Inquiry.objects.create(
        requested_by=user,
        name="Toyota",
        manufacturing_year=2024,
        model="Corolla",
        color="White",
        paint_section="Original",
        chassis_number=chassis_number,
        transmission=Inquiry.Transmission.AUTOMATIC,
        mileage=1000,
        requester_name="Test Customer",
        contact_number="09121234567",
        email="customer@example.com",
    )


class InquiryDeliveryTrackingTests(APITestCase):
    def setUp(self):
        self.customer = User.objects.create_user("09121234567")
        self.other_customer = User.objects.create_user("09121234568")
        self.staff = User.objects.create_user("09121234569", is_staff=True)
        self.inquiry = create_inquiry(self.customer)

    def test_new_inquiry_starts_at_request_received(self):
        self.assertEqual(
            self.inquiry.delivery_status,
            Inquiry.DeliveryStatus.REQUEST_RECEIVED,
        )
        self.assertEqual(self.inquiry.delivery_progress, 10)

    def test_serializer_exposes_status_label_and_progress(self):
        data = InquirySerializer(self.inquiry).data

        self.assertEqual(data["delivery_status"], "request_received")
        self.assertEqual(data["delivery_status_display"], "Request received")
        self.assertEqual(data["delivery_progress"], 10)

    def test_customer_only_lists_their_own_inquiries(self):
        create_inquiry(self.other_customer, chassis_number="CHASSIS-002")
        self.client.force_authenticate(self.customer)

        response = self.client.get(reverse("inquiry-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["id"], self.inquiry.id)

    def test_customer_cannot_update_delivery_status(self):
        self.client.force_authenticate(self.customer)
        url = reverse(
            "inquiry-update-delivery-status",
            args=(self.inquiry.id,),
        )

        response = self.client.patch(
            url,
            {"delivery_status": Inquiry.DeliveryStatus.IN_TRANSIT},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_staff_can_update_delivery_status(self):
        self.client.force_authenticate(self.staff)
        url = reverse(
            "inquiry-update-delivery-status",
            args=(self.inquiry.id,),
        )

        response = self.client.patch(
            url,
            {"delivery_status": Inquiry.DeliveryStatus.IN_TRANSIT},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["delivery_progress"], 65)
        self.inquiry.refresh_from_db()
        self.assertEqual(
            self.inquiry.delivery_status,
            Inquiry.DeliveryStatus.IN_TRANSIT,
        )

    def test_creating_an_inquiry_assigns_authenticated_customer(self):
        self.client.force_authenticate(self.customer)
        payload = {
            "name": "Honda",
            "manufacturing_year": 2025,
            "model": "Civic",
            "color": "Black",
            "paint_section": "Original",
            "chassis_number": "CHASSIS-003",
            "transmission": Inquiry.Transmission.AUTOMATIC,
            "mileage": 0,
            "requester_name": "Test Customer",
            "contact_number": "09121234567",
            "email": "customer@example.com",
        }

        response = self.client.post(
            reverse("inquiry-list"),
            payload,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        created = Inquiry.objects.get(chassis_number="CHASSIS-003")
        self.assertEqual(created.requested_by, self.customer)
