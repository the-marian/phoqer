from django.urls import path
from . import views

app_name = 'favourite'

urlpatterns = [
    path('', views.FavouriteListOffersView.as_view(), name='favourite'),
]
