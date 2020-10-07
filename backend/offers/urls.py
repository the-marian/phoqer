from django.urls import path
from . import views

app_name = 'offers'

urlpatterns = [
    path('popular/', views.PopularOffersView.as_view(), name='popular'),
    path('search/', views.SearchOffersView.as_view(), name='search'),
    # path('<pk>/', , name='offer_detail'),
]
