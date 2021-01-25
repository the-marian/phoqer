from django.urls import path

from . import views

app_name = 'favorite'

urlpatterns = [
    path('', views.FavoriteListOffersView.as_view(), name='favorite'),
]
