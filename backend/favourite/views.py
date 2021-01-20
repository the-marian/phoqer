from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from offers.serializers import OfferListItemSerializer


class FavoriteListOffersView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OfferListItemSerializer

    def get_queryset(self):
        client = self.request.user
        return client.favorite_offers.all()
