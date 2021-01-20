from django.urls import path

from .views import CommentDestroyView, CommentReplyView, CommentView, CommentVoteView

app_name = 'comments'

urlpatterns = [
    path('<uuid:offer>/', CommentView.as_view(), name='comment-list-create'),
    path('<int:pk>/', CommentDestroyView.as_view(), name='comment-delete'),
    path('<int:pk>/reply/', CommentReplyView.as_view(), name='comment-reply'),
    path('<int:pk>/<str:vote>/', CommentVoteView.as_view(), name='comment-vote'),
]
