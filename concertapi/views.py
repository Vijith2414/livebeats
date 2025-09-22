from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.forms import UserCreationForm
from rest_framework.permissions import AllowAny, IsAuthenticated,BasePermission
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from concerts.forms import Concertform
from concerts.models import Concert
from .serializers import concertSerializer,BookingSerializer
from rest_framework.views import APIView
from bookings.models import Booking



class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser
    
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    form = UserCreationForm(data=request.data)
    if form.is_valid():
        user = form.save()
        token, _ = Token.objects.get_or_create(user=user)  # Create token for the user
        return Response({'message': 'Account created successfully', 'token': token.key}, status=status.HTTP_201_CREATED)
    return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)
    if user is None:
        return Response({'error': 'Invalid credentials, please try again'}, status=status.HTTP_404_NOT_FOUND)

    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key}, status=status.HTTP_200_OK)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated, IsSuperUser])
# def concert_create(request):
    
#      form = Concertform(request.POST)
#      if form.is_valid():
#          concert = form.save()
#          return Response({'id': concert.id},status=status.HTTP_201_CREATED)
#      return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsSuperUser])
def concert_create(request):
    serializer = concertSerializer(data=request.data)
    if serializer.is_valid():
        concert = serializer.save()
        return Response({'id': concert.id}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes((AllowAny,))
def listconcert(request):
    concert = Concert.objects.all()
    serializer = concertSerializer(concert,many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsSuperUser])
def updateconcert(request, pk):
    concert = get_object_or_404(Concert, pk=pk)
    serializer = concertSerializer(concert, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsSuperUser])
def deleteconcert(request, pk):
    try:
        concert=Concert.objects.get(pk=pk)
    except Concert.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    concert.delete()
    return Response("delete successfully")


class BookTicketAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, concert_id):
        concert = get_object_or_404(Concert, id=concert_id)
        tickets_requested = request.data.get('tickets_booked')

        if tickets_requested is None or int(tickets_requested)<=0:
            return Response({'error': 'Invalid ticket count'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user already has a booking
        existing_booking = Booking.objects.filter(user=request.user, concert=concert).first()
        if existing_booking:
            existing_booking.tickets_booked += int(tickets_requested)
            if existing_booking.tickets_booked + tickets_requested <= 4:
                existing_booking.save()
            else:
                return Response({'error': 'already booked 3 tickets'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            Booking.objects.create(user=request.user, concert=concert, tickets_booked=tickets_requested)

        concert.available_tickets -= int(tickets_requested)
        concert.save()

        return Response({'message': 'Booking successful'}, status=status.HTTP_201_CREATED)


class UserBookingsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        bookings = Booking.objects.filter(user=request.user)
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CancelBookingAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, booking_id):
        booking = get_object_or_404(Booking, id=booking_id, user=request.user)
        concert = booking.concert
        concert.available_tickets += booking.tickets_booked
        concert.save()
        booking.delete()
        return Response({'message': 'Booking cancelled successfully'}, status=status.HTTP_200_OK)


from rest_framework.permissions import IsAdminUser

class AdminBookingsAPIView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        bookings = Booking.objects.select_related('concert', 'user').all()
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['GET'])
@permission_classes((AllowAny,))
def get_concert(request, pk):
    concert = get_object_or_404(Concert, pk=pk)
    serializer = concertSerializer(concert)
    return Response(serializer.data, status=status.HTTP_200_OK)


class UserDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = {
            'id': user.id,
            'username': user.username,
            'is_admin': user.is_staff or user.is_superuser  # True if user is admin
        }
        return Response(data, status=status.HTTP_200_OK)