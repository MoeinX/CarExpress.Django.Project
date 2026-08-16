from rest_framework import serializers

from .models import PhoneOTP, User, normalize_phone_number, phone_number_validator


class GenerateOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=16)
    first_name = serializers.CharField(max_length=100, required=False)
    last_name = serializers.CharField(max_length=100, required=False)
    national_id = serializers.CharField(max_length=10, required=False)

    def validate_phone_number(self, value):
        phone_number = normalize_phone_number(value)
        phone_number_validator(phone_number)
        return phone_number


class VerifyOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=16)
    otp = serializers.RegexField(r"^\d{6}$")

    def validate_phone_number(self, value):
        phone_number = normalize_phone_number(value)
        phone_number_validator(phone_number)
        return phone_number


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
