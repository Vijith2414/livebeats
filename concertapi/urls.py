from django.urls import path
from . import views


urlpatterns = [
    path('signup',views.signup,name='signup_api'),
    path('login',views.login, name='login_api'),
    path('newconcert', views.concert_create, name='createconcertapi'),
    path('listconcert',views.listconcert,name='retiveconcertapi'),
    path('<int:pk>/updateconcert',views.updateconcert,name='updateconcertapi'),
    path('<int:pk>/deleteconcert',views.deleteconcert,name='deleteconcertapi'),
    path('book/<int:concert_id>/', views.BookTicketAPIView.as_view(), name='book-ticket'),
    path('user-bookings/', views.UserBookingsAPIView.as_view(), name='user-bookings'),
    path('cancel/<int:booking_id>/', views.CancelBookingAPIView.as_view(), name='cancel-booking'),
    path('admin/bookings/', views.AdminBookingsAPIView.as_view(), name='admin-bookings'),
    path('<int:pk>/', views.get_concert, name='get_concert'),
    path('user-details/', views.UserDetailAPIView.as_view(), name='user-details'),
]