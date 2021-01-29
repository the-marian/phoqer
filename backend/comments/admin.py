from django.contrib import admin

from comments.models import Comment, CommentImage

admin.site.register(Comment)
admin.site.register(CommentImage)
