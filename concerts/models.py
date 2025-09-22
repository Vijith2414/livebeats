from django.db import models

class Concert(models.Model):
    image = models.URLField(default="https://www.bing.com/th?id=OIP.Gtl8XmpSOEf1zXrgaSwW9AHaE8&w=309&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",max_length=500)
    name = models.CharField(max_length=100)
    venue = models.CharField(max_length=100)
    date_time = models.DateTimeField()
    ticket_price = models.DecimalField(max_digits=10, decimal_places=2)
    available_tickets = models.PositiveIntegerField()

    def __str__(self):
        return self.name