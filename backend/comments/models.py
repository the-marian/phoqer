from django.conf import settings
from django.db import models

from offers.models import Offer
from users.models import User


class AbstractComment(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    offer = models.ForeignKey(Offer, on_delete=models.CASCADE)
    pub_date = models.DateField(auto_now=True)
    body = models.TextField()
    up_votes = models.SmallIntegerField(default=0)
    down_votes = models.SmallIntegerField(default=0)

    class Meta:
        abstract = True

    def __str__(self) -> str:
        return self.body


class Comment(AbstractComment):
    ...


class CommentReply(AbstractComment):
    reply_comments = models.ForeignKey(Comment, related_name='comment_replies', on_delete=models.CASCADE)


class CommentImage(models.Model):
    name = models.CharField(max_length=50)
    comment = models.ForeignKey(Comment, related_name='comment_images', on_delete=models.CASCADE)
    url = models.URLField()

    def __str__(self) -> str:
        return self.name


class CommentReplyImage(models.Model):
    name = models.CharField(max_length=50)
    comment_reply = models.ForeignKey(CommentReply, related_name='comment_reply_images', on_delete=models.CASCADE)
    url = models.URLField()

    def __str__(self) -> str:
        return self.name
