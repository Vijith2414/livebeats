from django.db import models
from django.contrib.auth.models import User
from concerts.models import Concert

class Booking(models.Model):
    user= models.ForeignKey(User, on_delete=models.CASCADE)
    concert = models.ForeignKey(Concert, on_delete=models.CASCADE)
    tickets_booked = models.PositiveIntegerField()
    payment_status = models.PositiveBigIntegerField(default=False)
    ticket_id = models.CharField(max_length=255,blank=True,null=True)

    class Meta:
        unique_together = ('user', 'concert')
    
    def __str__(self):
        return f"{self.user.username} - {self.concert.name} ({self.tickets_booked} tickets)"

