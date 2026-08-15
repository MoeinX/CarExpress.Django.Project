from django.db import models


class Inquiry(models.Model):
    class Transmission(models.TextChoices):
        MANUAL = "manual", "Manual"
        AUTOMATIC = "automatic", "Automatic"

    name = models.CharField(max_length=100)
    manufacturing_year = models.PositiveSmallIntegerField()
    model = models.CharField(max_length=100)
    color = models.CharField(max_length=50)
    paint_section = models.CharField(max_length=100)
    chassis_number = models.CharField(max_length=100, unique=True)
    transmission = models.CharField(
        max_length=20,
        choices=Transmission.choices,
    )
    mileage = models.PositiveIntegerField()
    requester_name = models.CharField(max_length=150)
    contact_number = models.CharField(max_length=30)
    email = models.EmailField()

    def __str__(self):
        return f"{self.name} {self.model} - {self.requester_name}"
