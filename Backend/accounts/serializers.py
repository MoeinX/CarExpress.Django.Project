from rest_framework import serializers

from .models import PhoneOTP, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "phone_number",
            "is_phone_verified",
            "date_joined",
        )
        read_only_fields = (
            "id",
            "phone_number",
            "is_phone_verified",
            "date_joined",
        )


class PhoneOTPSerializer(serializers.ModelSerializer):
    is_expired = serializers.BooleanField(read_only=True)
    can_attempt = serializers.BooleanField(read_only=True)

    class Meta:
        model = PhoneOTP
        fields = (
            "id",
            "phone_number",
            "purpose",
            "created_at",
            "expires_at",
            "attempts",
            "max_attempts",
            "is_used",
            "is_expired",
            "can_attempt",
        )
        read_only_fields = fields
