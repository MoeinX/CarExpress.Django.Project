from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("tracking", "0006_shipment_customer_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="shipment",
            name="stage_dates",
            field=models.JSONField(blank=True, default=dict),
        ),
    ]