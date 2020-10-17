from django.urls import path

from .views import CreateOfferView, OfferView, SearchOffersView, PopularOffersView

app_name = 'offers'

urlpatterns = [
    path('popular/', PopularOffersView.as_view(), name='popular'),
    path('search/', SearchOffersView.as_view(), name='search'),
    path('', CreateOfferView.as_view(), name='offer-create'),
    path('<uuid:pk>/', OfferView.as_view(), name='offer-detail'),
]
