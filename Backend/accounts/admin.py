from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import PhoneOTP, User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    form = CustomUserChangeForm
    add_form = CustomUserCreationForm
    ordering = ("phone_number",)
    list_display = (
        "phone_number",
        "is_phone_verified",
        "is_staff",
        "is_active",
    )
    search_fields = ("phone_number",)
    readonly_fields = ("last_login", "date_joined")
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "phone_number",
                    "password",
                    "is_phone_verified",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "phone_number",
                    "password1",
                    "password2",
                    "is_phone_verified",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )


@admin.register(PhoneOTP)
class PhoneOTPAdmin(admin.ModelAdmin):
    list_display = (
        "phone_number",
        "purpose",
        "created_at",
        "expires_at",
        "attempts",
        "is_used",
    )
    list_filter = ("purpose", "is_used")
    search_fields = ("phone_number",)
    readonly_fields = (
        "phone_number",
        "code_hash",
        "purpose",
        "created_at",
        "expires_at",
        "attempts",
        "max_attempts",
        "is_used",
    )

    def has_add_permission(self, request):
        return False
