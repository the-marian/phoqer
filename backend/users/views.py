# Create your views here.
from rest_framework.generics import RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated

from users.models import User
from users.serializers import UserDetailsSerializer, UserVoteSerializer


class UserDetailView(RetrieveAPIView):

    queryset = User.objects.all()
    serializer_class = UserDetailsSerializer


class UserVoteView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserVoteSerializer
