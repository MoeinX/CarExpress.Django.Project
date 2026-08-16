from django.conf import settings
from django.db import models


class Inquiry(models.Model):
    class Transmission(models.TextChoices):
        MANUAL = "manual", "Manual"
        AUTOMATIC = "automatic", "Automatic"

    class DeliveryStatus(models.TextChoices):
        REQUEST_RECEIVED = "request_received", "Request received"
        VEHICLE_INSPECTION = "vehicle_inspection", "Vehicle inspection"
        PURCHASED = "purchased", "Purchased"
        IN_TRANSIT = "in_transit", "In transit"
        CUSTOMS_CLEARANCE = "customs_clearance", "Customs clearance"
        READY_FOR_DELIVERY = "ready_for_delivery", "Ready for delivery"
        DELIVERED = "delivered", "Delivered"
        CANCELLED = "cancelled", "Cancelled"

    DELIVERY_PROGRESS = {
        DeliveryStatus.REQUEST_RECEIVED: 10,
        DeliveryStatus.VEHICLE_INSPECTION: 25,
        DeliveryStatus.PURCHASED: 45,
        DeliveryStatus.IN_TRANSIT: 65,
        DeliveryStatus.CUSTOMS_CLEARANCE: 80,
        DeliveryStatus.READY_FOR_DELIVERY: 95,
        DeliveryStatus.DELIVERED: 100,
        DeliveryStatus.CANCELLED: 0,
    }

    requested_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="inquiries",
        null=True,
        blank=True,
    )
    name = models.CharField(max_length=100)
    manufacturing_year = models.PositiveSmallIntegerField()
    model = models.CharField(max_length=100)
    color = models.CharField(max_length=50)
    paint_section = models.CharField(max_length=100)
    chassis_number = models.CharField(max_length=100, unique=True)
    transmission = models.CharField(
        max_length=20,
        choices=Transmission.choices,
    )
    mileage = models.PositiveIntegerField()
    requester_name = models.CharField(max_length=150)
    contact_number = models.CharField(max_length=30)
    email = models.EmailField()
    delivery_status = models.CharField(
        max_length=30,
        choices=DeliveryStatus.choices,
        default=DeliveryStatus.REQUEST_RECEIVED,
        db_index=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)

    @property
    def delivery_progress(self):
        return self.DELIVERY_PROGRESS[self.delivery_status]

    def __str__(self):
        return f"{self.name} {self.model} - {self.requester_name}"
