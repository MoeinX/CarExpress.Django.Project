from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import STANDARD_TRACKING_STEPS, Shipment


class StaffTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        user = authenticate(
            request=self.context.get("request"),
            username=attrs.get(self.username_field),
            password=attrs.get("password"),
        )
        if user is not None and not user.is_staff:
            raise serializers.ValidationError(
                {"detail": "Only staff users can access the management panel."}
            )
        data = super().validate(attrs)
        data["phone_number"] = self.user.phone_number
        return data


class ShipmentSerializer(serializers.ModelSerializer):
    steps = serializers.SerializerMethodField()
    progress = serializers.SerializerMethodField()
    current_step = serializers.SerializerMethodField()

    class Meta:
        model = Shipment
        fields = (
            "id",
            "tracking_code",
            "car_model",
            "color",
            "origin",
            "destination",
            "estimated_arrival",
            "customer_note",
            "completed_steps",
            "is_active",
            "steps",
            "progress",
            "current_step",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")

    def get_progress(self, obj):
        return round((obj.completed_steps / len(STANDARD_TRACKING_STEPS)) * 100)

    def get_steps(self, obj):
        return [
            {
                "id": position,
                "position": position,
                "title": title,
                "description": description,
                "status": (
                    "completed"
                    if position <= obj.completed_steps
                    else "current"
                    if position == obj.completed_steps + 1
                    else "pending"
                ),
            }
            for position, (title, description) in enumerate(
                STANDARD_TRACKING_STEPS,
                start=1,
            )
        ]

    def get_current_step(self, obj):
        steps = self.get_steps(obj)
        if obj.completed_steps >= len(steps):
            return steps[-1]
        return steps[obj.completed_steps]
