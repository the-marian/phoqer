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
    author = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Offer
        fields = [
            'author',
            'category',
            'city',
            'cover_image',
            'currency',
            'deposit_val',
            'description',
            'description',
            'doc_needed',
            'extra_requirements',
            'id',
            'is_deliverable',
            'max_rent_period',
            'mix_rent_period',
            'sub_category',
            'title',
            'price',
        ]
        extra_kwargs = {
            "category": {"required": False},
            "city": {"required": False},
            "cover_image": {"required": False},
            "currency": {"required": False},
            "deposit_val": {"required": False},
            "description": {"required": False},
            "doc_needed": {"required": False},
            "extra_requirements": {"required": False},
            "is_deliverable": {"required": False},
            "max_rent_period": {"required": False},
            "mix_rent_period": {"required": False},
            "sub_category": {"required": False},
            "title": {"required": False},
            "price": {"required": False},
        }
