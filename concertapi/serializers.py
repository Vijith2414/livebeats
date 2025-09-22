from rest_framework import serializers
from concerts.models import Concert
from bookings.models import Booking
from django.contrib.auth.models import User

class concertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concert
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']
        
class BookingSerializer(serializers.ModelSerializer):
    concert = concertSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    class Meta:
        model = Booking
        fields = ['id', 'tickets_booked', 'payment_status', 'ticket_id', 'user', 'concert']
        read_only_fields = ['user']
