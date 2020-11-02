from rest_framework import serializers

from offers.models import Offer
from .models import Comment, CommentImage, Like, Dislike


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
    likes = serializers.SerializerMethodField()
    dislikes = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = [
            'id',
            'author',
            'body',
            'dislikes',
            'images',
            'likes',
            'offer',
            'pub_date',
            'replies',
        ]

    def get_likes(self, comment):
        return comment.comment_like.all().count()

    def get_dislikes(self, comment):
        return comment.comment_dislike.all().count()

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

    def create(self, validated_data: dict) -> Comment:
        offer_id = self.context['view'].kwargs['offer']
        validated_data['offer'] = Offer.objects.get(pk=offer_id)
        return self.Meta.model.objects.create(**validated_data)


class CommentVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = []

    def create_vote_or_delete_if_exist(self, vote_model, comment_instance):
        try:
            vote = vote_model.objects.get(comment=comment_instance, author=self.context['request'].user)
            vote.delete()
        except vote_model.DoesNotExist:
            vote_model.objects.create(comment=comment_instance, author=self.context['request'].user)

    def delete_opposite_vote_if_exist(self, opposite_vote_model, comment_instance):
        try:
            vote = opposite_vote_model.objects.get(comment=comment_instance, author=self.context['request'].user)
            vote.delete()
        except opposite_vote_model.DoesNotExist:
            pass

    def update(self, instance: Comment, validated_data):
        if vote := self.context['view'].kwargs.get('vote'):
            if vote == 'like':
                self.delete_opposite_vote_if_exist(opposite_vote_model=Dislike, comment_instance=instance)
                self.create_vote_or_delete_if_exist(vote_model=Like, comment_instance=instance)
            if vote == 'dislike':
                self.delete_opposite_vote_if_exist(opposite_vote_model=Like, comment_instance=instance)
                self.create_vote_or_delete_if_exist(vote_model=Dislike, comment_instance=instance)
        return instance
