from rest_framework import serializers

from accounts.serializers import UserSerializer

from .models import Inquiry


class InquirySerializer(serializers.ModelSerializer):
    requested_by = UserSerializer(read_only=True)
    delivery_status = serializers.CharField(read_only=True)
    delivery_status_display = serializers.CharField(
        source="get_delivery_status_display",
        read_only=True,
    )
    delivery_progress = serializers.IntegerField(read_only=True)

    class Meta:
        model = Inquiry
        fields = (
            "id",
            "requested_by",
            "name",
            "manufacturing_year",
            "model",
            "color",
            "paint_section",
            "chassis_number",
            "transmission",
            "mileage",
            "requester_name",
            "contact_number",
            "email",
            "delivery_status",
            "delivery_status_display",
            "delivery_progress",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")


class DeliveryStatusUpdateSerializer(serializers.ModelSerializer):
    delivery_status_display = serializers.CharField(
        source="get_delivery_status_display",
        read_only=True,
    )
    delivery_progress = serializers.IntegerField(read_only=True)

    class Meta:
        model = Inquiry
        fields = (
            "delivery_status",
            "delivery_status_display",
            "delivery_progress",
            "updated_at",
        )
        read_only_fields = ("updated_at",)
