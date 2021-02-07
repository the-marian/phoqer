from django.db.models.aggregates import Avg
from djoser.conf import settings
from rest_framework import serializers

from offers.serializers import OfferListItemSerializer
from users.models import (CommunicationRating, DescriptionRating, User,
                          UserDislike, UserLike)


class TokenSerializer(serializers.ModelSerializer):
    auth_token = serializers.CharField(source="key")
    birth_date = serializers.CharField(source="user.birth_date")
    email = serializers.CharField(source="user.email")
    location = serializers.CharField(source="user.location")

    class Meta:
        model = settings.TOKEN_MODEL
        fields = (
            "auth_token",
            "birth_date",
            "email",
            "location",
        )


class UserDetailsSerializer(serializers.ModelSerializer):
    offers = OfferListItemSerializer(many=True, read_only=True, source='author_offers')
    likes = serializers.SerializerMethodField()
    dislikes = serializers.SerializerMethodField()
    satisfaction_rate = serializers.SerializerMethodField()
    communication_rate = serializers.SerializerMethodField()
    description_rate = serializers.SerializerMethodField()
    response_rate = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            "bio",
            "date_joined",
            "first_name",
            "last_login",
            "last_name",
            "offers",
            "profile_img",
            "likes",
            "dislikes",
            "satisfaction_rate",
            "communication_rate",
            "description_rate",
            "response_rate",
        )

    def get_likes(self, user):
        return user.user_likes.all().count()

    def get_dislikes(self, user):
        return user.user_dislikes.all().count()

    def get_satisfaction_rate(self, user):
        likes = self.get_likes(user)
        dislikes = self.get_dislikes(user)
        try:
            return round((likes * 100) / (likes + dislikes), 2)
        except ZeroDivisionError:
            return 0

    def get_communication_rate(self, user):
        return round(CommunicationRating.objects.filter(user=user).aggregate
                     (Avg('mark'))['mark__avg'] or 0, 1)

    def get_description_rate(self, user):
        return round(DescriptionRating.objects.filter(user=user).aggregate
                     (Avg('mark'))['mark__avg'] or 0, 1)

    def get_response_rate(self, user):
        return 56


class UserVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = []

    def create_vote_or_delete_if_exist(self, vote_model, user_instance):
        try:
            vote = vote_model.objects.get(
                user=user_instance,
                author=self.context['request'].user
            )
            vote.delete()
        except vote_model.DoesNotExist:
            vote_model.objects.create(
                user=user_instance,
                author=self.context['request'].user
            )

    def delete_opposite_vote_if_exist(self, opposite_vote_model, user_instance):
        try:
            vote = opposite_vote_model.objects.get(
                user=user_instance,
                author=self.context['request'].user
            )
            vote.delete()
        except opposite_vote_model.DoesNotExist:
            pass

    def update(self, instance: User, validated_data):
        if vote := self.context['view'].kwargs.get('vote'):
            if vote == 'like':
                self.delete_opposite_vote_if_exist(
                    opposite_vote_model=UserDislike,
                    user_instance=instance
                )
                self.create_vote_or_delete_if_exist(
                    vote_model=UserLike,
                    user_instance=instance
                )
            if vote == 'dislike':
                self.delete_opposite_vote_if_exist(
                    opposite_vote_model=UserLike,
                    user_instance=instance
                )
                self.create_vote_or_delete_if_exist(
                    vote_model=UserDislike,
                    user_instance=instance
                )
        return instance
