import datetime

from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from users.models import User
from .models import Offer, OfferImages


class OfferImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfferImages
        fields = [
            'name',
            'url',
        ]


class OfferListItemSerializer(serializers.ModelSerializer):
    images = OfferImageSerializer(many=True, read_only=True)
    is_favorite = serializers.SerializerMethodField()
    is_promoted = serializers.SerializerMethodField()

    class Meta:
        model = Offer
        fields = [
            'cover_image',
            'currency',
            'description',
            'id',
            'images',
            'is_favorite',
            'is_promoted',
            'is_deliverable',
            'price',
            'pub_date',
            'title',
            'views',
        ]

    @extend_schema_field(OpenApiTypes.BOOL)
    def get_is_favorite(self, offer):
        user_query_param = self.context['request'].query_params.get('user', None)
        if user_query_param:
            user = User.objects.get(email=user_query_param)
            return offer in user.favourite_offers.all()
        return False

    @extend_schema_field(OpenApiTypes.BOOL)
    def get_is_promoted(self, offer):
        if offer.promote_til_date and datetime.date.today() < offer.promote_til_date:
            return True
        return False


class OfferSerializer(serializers.ModelSerializer):
    images = OfferImageSerializer(many=True, read_only=True)

    class Meta:
        model = Offer
        fields = '__all__'
