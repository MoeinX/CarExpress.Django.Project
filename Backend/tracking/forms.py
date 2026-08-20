from django.contrib.auth.forms import UserChangeForm, UserCreationForm

from .models import AdminUser


class AdminUserCreationForm(UserCreationForm):
    class Meta:
        model = AdminUser
        fields = ("phone_number",)


class AdminUserChangeForm(UserChangeForm):
    class Meta:
        model = AdminUser
        fields = "__all__"
