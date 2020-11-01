from rest_framework import serializers

from .models import Comment, CommentReply, CommentReplyImage, CommentImage


class CommentReplyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentReplyImage
        fields = [
            'id',
            'name',
            'url',
        ]


class CommentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentImage
        fields = [
            'id',
            'name',
            'url',
        ]


class CommentReplySerializer(serializers.ModelSerializer):
    images = CommentReplyImageSerializer(many=True, read_only=True, source='comment_reply_images')

    class Meta:
        model = CommentReply
        fields = [
            'id',
            'author',
            'offer',
            'pub_date',
            'body',
            'up_votes',
            'down_votes',
            'images',
        ]


class CommentSerializer(serializers.ModelSerializer):
    replies = CommentReplySerializer(many=True, read_only=True, source='comment_replies')
    images = CommentImageSerializer(many=True, read_only=True, source='comment_images')
    author = serializers.CharField(source="author.email")

    class Meta:
        model = Comment
        fields = [
            'id',
            'author',
            'offer',
            'pub_date',
            'body',
            'up_votes',
            'down_votes',
            'replies',
            'images',
        ]

class CommentCreateSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    class Meta:
        model = Comment
        fields = [
            'body',
            'author',
            'offer',
        ]