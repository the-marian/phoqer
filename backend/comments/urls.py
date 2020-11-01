from django.urls import path

from .views import CommentsView, CreateCommentView

app_name = 'comments'

urlpatterns = [
    path('<uuid:offer>/', CommentsView.as_view(), name='offer-comments'),
    path('', CreateCommentView.as_view(), name='comment-create'),
    path('<int:pk>/like', CommentsView.as_view(), name='comment-like'),
    path('<int:pk>/dislike', CommentsView.as_view(), name='comment-dislike'),
    path('<int:pk>/reply', CommentsView.as_view(), name='comment-reply'),

]
