from django.contrib.auth import authenticate
from django.db import transaction
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (
    STANDARD_TRACKING_STEPS,
    TRACKING_STEPS_I18N,
    Shipment,
    ShipmentDocument,
)


def normalize_digits(value):
    value = str(value)
    return value.translate(str.maketrans("۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩", "01234567890123456789"))

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


class ShipmentDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShipmentDocument
        fields = ("id", "title", "file", "created_at")
        read_only_fields = ("id", "created_at")


class ShipmentSerializer(serializers.ModelSerializer):
    steps = serializers.SerializerMethodField()
    progress = serializers.SerializerMethodField()
    current_step = serializers.SerializerMethodField()
    documents = ShipmentDocumentSerializer(many=True, read_only=True)  # این خط برای ارسال فایل‌ها به فرانت‌اند ضروری است

    class Meta:
        model = Shipment
        fields = (
            "id",
            "tracking_code",
            "customer_name",
            "car_brand",
            "car_model",
            "build_year",
            "color",
            "origin",
            "destination",
            "estimated_arrival",
            "customer_note",
            "completed_steps",
            "stage_dates",
            "is_active",
            "steps",
            "progress",
            "current_step",
            "documents",  # حتماً باید اینجا باشد
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")

    def to_internal_value(self, data):
        normalized_data = data.copy()
        for field in ("tracking_code", "build_year", "estimated_arrival"):
            if field in normalized_data:
                normalized_data[field] = normalize_digits(normalized_data[field])
        return super().to_internal_value(normalized_data)

    def _create_documents(self, shipment, request):
        if not request:
            return

        files = request.FILES.getlist("uploaded_files")
        titles = request.data.getlist("file_titles") if hasattr(request.data, "getlist") else []
        for index, file in enumerate(files):
            title = titles[index].strip() if index < len(titles) else ""
            ShipmentDocument.objects.create(
                shipment=shipment,
                title=title or f"فایل {index + 1}",
                file=file,
            )

    def create(self, validated_data):
        request = self.context.get("request")
        with transaction.atomic():
            shipment = Shipment.objects.create(**validated_data)
            self._create_documents(shipment, request)
        return shipment

    def update(self, instance, validated_data):
        request = self.context.get("request")
        with transaction.atomic():
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            instance.save()
            self._create_documents(instance, request)
        return instance

    def _get_language(self):
        request = self.context.get("request")
        if not request:
            return "fa"
        lang = getattr(request, "query_params", {}).get("lang") if hasattr(request, "query_params") else None
        if not lang and hasattr(request, "GET"):
            lang = request.GET.get("lang")
        if lang and lang.lower() in ("fa", "ar", "en"):
            return lang.lower()
        accept_lang = getattr(request, "headers", {}).get("Accept-Language") if hasattr(request, "headers") else request.META.get("HTTP_ACCEPT_LANGUAGE", "")
        if accept_lang:
            code = accept_lang.split(",")[0].split(";")[0].split("-")[0].strip().lower()
            if code in ("fa", "ar", "en"):
                return code
        return "fa"

    def get_progress(self, obj):
        return round((obj.completed_steps / len(STANDARD_TRACKING_STEPS)) * 100)

    def get_steps(self, obj):
        lang = self._get_language()
        steps_def = TRACKING_STEPS_I18N.get(lang, TRACKING_STEPS_I18N["fa"])
        return [
            {
                "id": position,
                "position": position,
                "title": title,
                "default_description": description,
                "date": obj.stage_dates.get(str(position), ""),
                "description": obj.stage_dates.get(str(position), "") or description,
                "status": (
                    "completed"
                    if position <= obj.completed_steps
                    else "current"
                    if position == obj.completed_steps + 1
                    else "pending"
                ),
            }
            for position, (title, description) in enumerate(
                steps_def,
                start=1,
            )
        ]

    def get_current_step(self, obj):
        steps = self.get_steps(obj)
        if not steps:
            return None
        if obj.completed_steps >= len(steps):
            return steps[-1]
        return steps[obj.completed_steps]