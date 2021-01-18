from django.urls import path

from .views import (
    CreateOfferView,
    DeleteOfferImageView,
    OfferView,
    PopularOffersView,
    SearchOffersView,
)

app_name = 'offers'

urlpatterns = [
    path('popular/', PopularOffersView.as_view(), name='popular'),
    path('search/', SearchOffersView.as_view(), name='search'),
    path('', CreateOfferView.as_view(), name='offer-create'),
    path('<uuid:pk>/', OfferView.as_view(), name='offer-detail'),
    path('image/<int:pk>/', DeleteOfferImageView.as_view(), name='offer-image-delete'),
]
