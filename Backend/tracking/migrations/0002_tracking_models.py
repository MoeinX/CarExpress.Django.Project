import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("tracking", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Shipment",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("tracking_code", models.CharField(db_index=True, max_length=100, unique=True)),
                ("car_model", models.CharField(max_length=150)),
                ("color", models.CharField(blank=True, max_length=80)),
                ("origin", models.CharField(max_length=200)),
                ("destination", models.CharField(max_length=200)),
                ("estimated_arrival", models.CharField(blank=True, max_length=150)),
                ("customer_note", models.TextField(blank=True)),
                ("is_active", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"ordering": ("-updated_at",)},
        ),
        migrations.CreateModel(
            name="TrackingStep",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=150)),
                ("description", models.CharField(blank=True, max_length=250)),
                ("status", models.CharField(choices=[("completed", "Completed"), ("current", "Current"), ("pending", "Pending")], default="pending", max_length=20)),
                ("position", models.PositiveSmallIntegerField(default=0)),
                ("happened_at", models.DateTimeField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("shipment", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="steps", to="tracking.shipment")),
            ],
            options={"ordering": ("position", "id")},
        ),
        migrations.AddConstraint(
            model_name="trackingstep",
            constraint=models.UniqueConstraint(fields=("shipment", "position"), name="unique_step_position_per_shipment"),
        ),
    ]
