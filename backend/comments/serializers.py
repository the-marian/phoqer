from rest_framework import serializers

from offers.models import Offer
from .models import Comment, CommentImage


class CommentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentImage
        fields = [
            'id',
            'name',
            'url',
        ]


class CommentSerializer(serializers.ModelSerializer):
    images = CommentImageSerializer(many=True, read_only=True, source='comment_images')
    author = serializers.CharField(source="author.get_full_name")

    class Meta:
        model = Comment
        fields = [
            'id',
            'author',
            'body',
            'down_votes',
            'images',
            'offer',
            'pub_date',
            'replies',
            'up_votes',
        ]

    def get_fields(self):
        fields = super(CommentSerializer, self).get_fields()
        fields['replies'] = CommentSerializer(many=True, read_only=True, source='comment_replies')
        return fields


class CommentCreateSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Comment
        fields = [
            'author',
            'body',
        ]

    def create(self, validated_data):
        offer_id = self.context['view'].kwargs['offer']
        validated_data['offer'] = Offer.objects.get(pk=offer_id)
        return self.Meta.model.objects.create(**validated_data)


class CommentVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment

    def update(self, instance, validated_data):
        return instance
