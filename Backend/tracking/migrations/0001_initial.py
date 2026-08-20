import django.core.validators
import django.utils.timezone
import tracking.models
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="AdminUser",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("password", models.CharField(max_length=128, verbose_name="password")),
                ("last_login", models.DateTimeField(blank=True, null=True, verbose_name="last login")),
                ("is_superuser", models.BooleanField(default=False, help_text="Designates that this user has all permissions without explicitly assigning them.", verbose_name="superuser status")),
                ("phone_number", models.CharField(max_length=16, unique=True, validators=[django.core.validators.RegexValidator(message="Enter a valid phone number containing 10 to 15 digits.", regex="^\\+?\\d{10,15}$")])),
                ("is_phone_verified", models.BooleanField(default=False)),
                ("is_active", models.BooleanField(default=True)),
                ("is_staff", models.BooleanField(default=False)),
                ("date_joined", models.DateTimeField(default=django.utils.timezone.now)),
                ("groups", models.ManyToManyField(blank=True, help_text="The groups this user belongs to.", related_name="admin_users", related_query_name="admin_user", to="auth.group", verbose_name="groups")),
                ("user_permissions", models.ManyToManyField(blank=True, help_text="Specific permissions for this user.", related_name="admin_users", related_query_name="admin_user", to="auth.permission", verbose_name="user permissions")),
            ],
            options={
                "verbose_name": "admin user",
                "verbose_name_plural": "admin users",
                "db_table": "accounts_user",
            },
            managers=[("objects", tracking.models.AdminUserManager())],
        ),
    ]
