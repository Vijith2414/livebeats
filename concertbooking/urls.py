"""
URL configuration for concertbooking project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path,include
from users import views
#from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
urlpatterns = [
    path('',views.home,name='home'),
    path('concerts/',include('concerts.urls')),
    path('signup/',views.Signup,name='signup'),
    path('login/',views.log_in,name='login'),
    path('logout/',views.log_out,name='logout'),
    path('booking/',include('bookings.urls')),
    path('concertapi/',include('concertapi.urls')),
    #path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh')
]
