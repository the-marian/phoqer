from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from .models import Offer
from .serializers import OfferListItemSerializer


class PopularOffersView(ListAPIView):
    serializer_class = OfferListItemSerializer

    def get_queryset(self):
        queryset = Offer.objects.order_by('-promote_til_date', 'views')
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(purchaser__username=username)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class SearchOffersView(ListAPIView):
    queryset = Offer.objects.order_by('views')
    serializer_class = OfferListItemSerializer

    def list(self, request, *args, **kwargs):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = OfferListItemSerializer(queryset, many=True)
        return Response(serializer.data)
