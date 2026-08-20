from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("tracking", "0003_alter_adminuser_groups_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="shipment",
            name="completed_steps",
            field=models.PositiveSmallIntegerField(
                choices=[
                    (0, "هیچ مرحله‌ای تکمیل نشده"),
                    (1, "تایید مدارک و RTA"),
                    (2, "ورود به بندر مبدأ"),
                    (3, "ترخیص و بارگیری"),
                    (4, "در مسیر دریایی"),
                    (5, "ورود به گمرک"),
                    (6, "انتقال با خودروبَر"),
                    (7, "پارک در پارکینگ / تحویل نهایی"),
                ],
                default=0,
            ),
        ),
        migrations.DeleteModel(name="TrackingStep"),
    ]
