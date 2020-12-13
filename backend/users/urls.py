from django.urls import path

from users.views import UserDetailView, UserVoteView

app_name = 'users'

urlpatterns = [
    path('<int:pk>/', UserDetailView.as_view(), name='user-detail-view'),
    path('<int:pk>/<str:vote>/', UserVoteView.as_view(), name='user-vote'),
]
