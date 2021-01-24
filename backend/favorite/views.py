from django.db.models import Q
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from offers.serializers import OfferListItemSerializer


class FavoriteListOffersView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OfferListItemSerializer

    def get_queryset(self):
        client = self.request.user
        return client.favorite_offers.filter(Q(status='ACTIVE') | Q(status='IN_RENT'))\
            .order_by('-promote_til_date', '-views')
