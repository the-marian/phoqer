from django.contrib import admin

# Register your models here.
from comments.models import Comment, CommentReply, CommentImage, CommentReplyImage

admin.site.register(Comment)
admin.site.register(CommentReply)
admin.site.register(CommentImage)
admin.site.register(CommentReplyImage)
