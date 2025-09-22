from django import forms
from .models import Booking
from django.db.models import Sum
class  BookingForm(forms.ModelForm):
    class Meta:
        model =Booking
        fields = ['tickets_booked']

    #extra
    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)  # Get the user from form instance
        self.concert = kwargs.pop('concert', None)  # Get the concert instance
        super().__init__(*args, **kwargs)

    def clean_tickets_booked(self):
        tickets_requested = self.cleaned_data.get('tickets_booked')

        if not self.user or not self.concert:
            raise forms.ValidationError("User and concert must be provided.")

        # Get total tickets user has already booked
        total_tickets = Booking.objects.filter(user=self.user, concert=self.concert).aggregate(Sum('tickets_booked'))['tickets_booked__sum'] or 0

        if total_tickets + tickets_requested > 3:
            raise forms.ValidationError(f"You already booked {total_tickets} out of 3 tickets ")

        if tickets_requested > self.concert.available_tickets:
            raise forms.ValidationError("Not enough tickets available.")

        return tickets_requested