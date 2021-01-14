from rest_framework.generics import ListAPIView
from users.models import User
from offers.serializers import OfferListItemSerializer


class FavouriteListOffersView(ListAPIView):
    serializer_class = OfferListItemSerializer

    def get_queryset(self):
        client = self.request.user
        if client:
            user = User.objects.get(email=client)
            return user.favourite_offers.all()
        return False
