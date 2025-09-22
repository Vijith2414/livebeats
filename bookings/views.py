from django.shortcuts import render,get_object_or_404,redirect
from .models import Booking
from .forms import BookingForm
from concerts.views import Concert
from django.contrib import messages
from django.contrib.auth.decorators import user_passes_test
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

@permission_classes([IsAuthenticated])
def book_tickets(request,concert_id):
    concert = get_object_or_404(Concert, id=concert_id)
    
    if request.method == 'POST':
        form = BookingForm(request.POST, user=request.user, concert=concert)
        if form.is_valid():
            tickets_requested = form.cleaned_data['tickets_booked']

            # Check if the user already has a booking
            existing_booking = Booking.objects.filter(user=request.user, concert=concert).first()
            if existing_booking:
                existing_booking.tickets_booked += tickets_requested
                existing_booking.payment_status = False
                existing_booking.save()
                booking_id = existing_booking.id
            else:
               booking = Booking.objects.create(user=request.user, concert=concert, tickets_booked=tickets_requested,payment_status=False)
               booking_id= booking.id
            
            concert.available_tickets -= tickets_requested
            concert.save()
            return redirect('payment', booking_id =booking_id)
    else:
        form = BookingForm()
    return render(request, 'book_tickets.html', {'concert': concert, 'form': form})

@permission_classes([IsAuthenticated])
def user_bookings(request):
    bookings = Booking.objects.filter(user=request.user)
    return  render(request,'user_bookings.html',{'bookings': bookings})

def cancel_booking(request,booking_id):
    booking = get_object_or_404(Booking, id=booking_id,user=request.user)
    concert = booking.concert
    concert.available_tickets += booking.tickets_booked
    concert.save()
    booking.delete()
    messages.success(request,"your booking has been cancelled successfully")
    return redirect('user_booking')

@user_passes_test(lambda u: u.is_superuser)
def admin_booking_view(request):
    bookings=Booking.objects.select_related('concert','user').all()
    return render(request,'admin_bookings.html',{'bookings':bookings})

@user_passes_test(lambda u: u.is_superuser)
def eachbooking(request, concert_id):
    concert = get_object_or_404(Concert, id=concert_id)
    bookings = Booking.objects.select_related('concert', 'user').filter(concert=concert)
    
    return render(request, 'bookings.html', {'bookings': bookings, 'concert': concert})

stripe.api_key = settings.STRIPE_SECRET_KEY


def payment_view(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id)

    # Calculate the total amount
    total_amount = booking.tickets_booked * booking.concert.ticket_price   # Amount in cents

    if request.method == 'POST':
        # Create a payment intent
        try:
            intent = stripe.PaymentIntent.create(
                amount=total_amount,
                currency='usd',  # Change to your currency
                metadata={'booking_id': booking.id}
            )
            return render(request, 'payment.html', {'client_secret': intent['client_secret'], 'booking': booking, 'total_amount': total_amount})
        except Exception as e:
            messages.error(request, str(e))
            return redirect('user_booking')

    return render(request, 'payment.html', {'booking': booking, 'total_amount': total_amount})


@csrf_exempt
def update_payment_status(request, booking_id):
    if request.method == 'POST':
        booking = get_object_or_404(Booking, id=booking_id)
        booking.payment_status= True
        booking.save()
        return JsonResponse({'status':'success'})
    return JsonResponse({'status':'failed'}, status=400)

def download_ticket(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id)

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="ticket_{booking.id}.pdf"'

    p = canvas.Canvas(response, pagesize=letter)
    p.drawString(100, 750, f"Concert: {booking.concert.name}")
    p.drawString(100, 730, f":User  {booking.user.username}")
    p.drawString(100, 710, f"Tickets Booked: {booking.tickets_booked}")
    p.drawString(100, 690, f"Payment Status: {'Paid' if booking.payment_status else 'Pending'}")
    p.drawString(100, 670, f"Ticket ID: {booking.ticket_id}")
    p.showPage()
    p.save()

    return response