from django.contrib import admin

# Register your models here.
from comments.models import Comment, CommentImage

admin.site.register(Comment)
admin.site.register(CommentImage)
