from django.urls import path
from . import views
from .views import OfferViewSet

app_name = 'offers'

offer_list = OfferViewSet.as_view({
    'post': 'create'
})
offer_detail = OfferViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
})

urlpatterns = [
    path('popular/', views.PopularOffersView.as_view(), name='popular'),
    path('search/', views.SearchOffersView.as_view(), name='search'),
    path('', offer_list, name='offer-list'),
    path('<uuid:pk>/', offer_detail, name='offer-detail'),
]
