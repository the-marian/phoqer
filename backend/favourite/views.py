from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from offers.serializers import OfferListItemSerializer


class FavouriteListOffersView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OfferListItemSerializer

    def get_queryset(self):
        client = self.request.user
        return client.favourite_offers.all()
