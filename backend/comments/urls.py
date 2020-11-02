from django.urls import path

from .views import CommentView, CommentVoteView

app_name = 'comments'

urlpatterns = [
    path('<uuid:offer>/', CommentView.as_view(), name='comment-list-create'),
    path('<int:pk>/<str:vote>', CommentVoteView.as_view(), name='comment-vote'),
    # path('<int:pk>/reply', CommentsView.as_view(), name='comment-reply'),

]
