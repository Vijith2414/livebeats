from django.urls import path
from . import views
from .views import admin_booking_view
from .views import payment_view, update_payment_status, download_ticket

urlpatterns = [
    path('<int:concert_id>/book/',views.book_tickets,name='booktickets'),
    path('my_booking/', views.user_bookings,name='user_booking'),
    path('cancel_booking/<int:booking_id>',views.cancel_booking,name= 'cancel_booking'),
    path('admin/bookings/',views.admin_booking_view,name='admin_bookings'),
    path('booking/each/booking/<int:concert_id>/', views.eachbooking, name='eachbookings'),
    path('payment/<int:booking_id>/', payment_view, name='payment'),
    path('update_payment_status/<int:booking_id>/', update_payment_status, name='update_payment_status'),
    path('download_ticket/<int:booking_id>/', download_ticket, name='download_ticket'),
 
]