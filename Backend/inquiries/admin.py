from django.contrib import admin

from .models import Inquiry


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "model",
        "manufacturing_year",
        "requester_name",
        "contact_number",
        "delivery_status",
        "delivery_progress",
    )
    search_fields = (
        "name",
        "model",
        "chassis_number",
        "requester_name",
        "contact_number",
        "email",
    )
    list_filter = (
        "delivery_status",
        "transmission",
        "manufacturing_year",
        "color",
    )
    readonly_fields = ("created_at", "updated_at")
