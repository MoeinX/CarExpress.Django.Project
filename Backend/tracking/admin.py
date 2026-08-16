from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .forms import AdminUserChangeForm, AdminUserCreationForm
from .models import AdminUser, Shipment


@admin.register(AdminUser)
class AdminUserAdmin(BaseUserAdmin):
    add_form = AdminUserCreationForm
    form = AdminUserChangeForm
    ordering = ("phone_number",)
    list_display = ("phone_number", "is_staff", "is_active", "date_joined")
    search_fields = ("phone_number",)
    fieldsets = (
        (None, {"fields": ("phone_number", "password")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("phone_number", "password1", "password2", "is_staff"),
            },
        ),
    )


@admin.register(Shipment)
class ShipmentAdmin(admin.ModelAdmin):
    list_display = (
        "tracking_code",
        "car_model",
        "origin",
        "destination",
        "completed_steps",
        "is_active",
        "updated_at",
    )
    list_filter = ("completed_steps", "is_active", "created_at", "updated_at")
    search_fields = ("tracking_code", "car_model", "origin", "destination")
    readonly_fields = ("created_at", "updated_at")
