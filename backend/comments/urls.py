from django.urls import path

from .views import CommentView

app_name = 'comments'

urlpatterns = [
    path('<uuid:offer>/', CommentView.as_view(), name='comment-list-create'),
    # path('<int:pk>/like', CommentVoteView.as_view(), name='comment-like'),
    # path('<int:pk>/dislike', CommentVoteView.as_view(), name='comment-dislike'),
    # path('<int:pk>/reply', CommentsView.as_view(), name='comment-reply'),

]
