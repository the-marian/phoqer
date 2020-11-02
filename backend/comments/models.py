from django.conf import settings
from django.db import models

from offers.models import Offer
from users.models import User


class Comment(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    body = models.TextField()
    offer = models.ForeignKey(Offer, on_delete=models.CASCADE)
    pub_date = models.DateField(auto_now=True)
    replies = models.ForeignKey('self', related_name='comment_replies', blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.body


class CommentImage(models.Model):
    comment = models.ForeignKey(Comment, related_name='comment_images', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    url = models.URLField()

    def __str__(self) -> str:
        return self.name


class Like(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, related_name='comment_likes', on_delete=models.CASCADE)


class Dislike(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, related_name='comment_dislikes', on_delete=models.CASCADE)
