from rest_framework import serializers
from rest_framework.generics import get_object_or_404

from offers.models import Offer
from .models import Comment, CommentImage, Dislike, Like


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
        return comment.comment_likes.all().count()

    def get_dislikes(self, comment):
        return comment.comment_dislikes.all().count()

    def get_fields(self):
        fields = super(CommentSerializer, self).get_fields()
        fields['replies'] = CommentSerializer(
            many=True, read_only=True,
            source='comment_replies')
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
        url_params = self.context['view'].kwargs
        if offer_id := url_params.get('offer'):
            validated_data['offer'] = Offer.objects.get(pk=offer_id)
        elif parent_comment_id := url_params.get('pk'):
            parent_comment = get_object_or_404(Comment, pk=parent_comment_id)
            validated_data['replies'] = parent_comment
            validated_data['offer'] = parent_comment.offer
        return self.Meta.model.objects.create(**validated_data)


class CommentVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = []

    def create_vote_or_delete_if_exist(self, vote_model, comment_instance):
        try:
            vote = vote_model.objects.get(comment=comment_instance,
                                          author=self.context['request'].user)
            vote.delete()
        except vote_model.DoesNotExist:
            vote_model.objects.create(comment=comment_instance,
                                      author=self.context['request'].user)

    def delete_opposite_vote_if_exist(self, opposite_vote_model, comment_instance):
        try:
            vote = opposite_vote_model.objects.get(comment=comment_instance,
                                                   author=self.context['request'].user)
            vote.delete()
        except opposite_vote_model.DoesNotExist:
            pass

    def update(self, instance: Comment, validated_data):
        if vote := self.context['view'].kwargs.get('vote'):
            if vote == 'like':
                self.delete_opposite_vote_if_exist(opposite_vote_model=Dislike,
                                                   comment_instance=instance)
                self.create_vote_or_delete_if_exist(vote_model=Like, comment_instance=instance)
            if vote == 'dislike':
                self.delete_opposite_vote_if_exist(opposite_vote_model=Like,
                                                   comment_instance=instance)
                self.create_vote_or_delete_if_exist(vote_model=Dislike,
                                                    comment_instance=instance)
        return instance
