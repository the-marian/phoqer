from django.db.models import Q, QuerySet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveUpdateAPIView,
)
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Offer, OfferImages
from .serializers import OfferImageSerializer, OfferListItemSerializer, OfferSerializer


class PopularOffersView(ListAPIView):
    serializer_class = OfferListItemSerializer
    queryset = Offer.objects.filter(
        Q(status='ACTIVE') | Q(status='IN_RENT')).order_by('-promote_til_date', '-views')

    def list(self, request: Request, *args, **kwargs) -> Response:
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class SearchOffersView(ListAPIView):
    serializer_class = OfferListItemSerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.OrderingFilter,
        filters.SearchFilter,
    ]
    filterset_fields = [
        'category',
        'city',
        'sub_category',
        'status',
        'is_deliverable',
    ]
    search_fields = [
        'description',
        'title',
    ]
    ordering_fields = [
        'pub_date',
        'views',
        'price',
        'deposit_val',
    ]

    def get_queryset(self) -> 'QuerySet[Offer]':
        query_params = self.request.query_params
        max_price = query_params.get('max_price')
        min_price = query_params.get('min_price')
        no_deposit = query_params.get('no_deposit')
        max_deposit = query_params.get('max_deposit')
        min_deposit = query_params.get('min_deposit')

        # because of "shadow name 'filters'
        # from outer scope" warning, I name it '_filters'
        _filters = {}
        if max_price:
            _filters['price__lte'] = max_price
        if min_price:
            _filters['price__gte'] = min_price
        if no_deposit:
            _filters['deposit_val__exact'] = '0'
        if max_deposit:
            _filters['deposit_val__lte'] = max_deposit
        if min_deposit:
            _filters['deposit_val__gte'] = min_deposit

        return Offer.objects.filter(Q(status='ACTIVE') | Q(status='IN_RENT'), **_filters)


class OfferView(RetrieveUpdateAPIView):
    serializer_class = OfferSerializer
    queryset = Offer.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]


class CreateOfferView(CreateAPIView):
    serializer_class = OfferSerializer
    queryset = Offer.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]


class DeleteOfferImageView(DestroyAPIView):
    serializer_class = OfferImageSerializer
    queryset = OfferImages.objects.all()
    permission_classes = [IsAuthenticated]
