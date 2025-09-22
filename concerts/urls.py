from django.urls import path,include
from . import views
urlpatterns = [
    path('create/', views.concert_create,name='create'),
    path('read/',views.concert_read,name='read'),
    path('<int:pk>/update/',views.concert_update,name='updateconcert'),
    path('<int:pk>/delete/',views.concert_delete,name='deleteconcert')
]
