from django import forms
from .models import Concert

class Concertform(forms.ModelForm):
    class Meta:
        model = Concert
        fields = ['image','name','date_time','venue','ticket_price','available_tickets']
        widgets = {
            'date_time': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
        }
        