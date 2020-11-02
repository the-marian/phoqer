# Create your views here.
from rest_framework.generics import UpdateAPIView, ListCreateAPIView, CreateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from comments.models import Comment
from comments.serializers import CommentSerializer, CommentCreateSerializer, CommentVoteSerializer


class CommentView(ListCreateAPIView):
    lookup_field = 'offer'
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Comment.objects.filter(offer=self.kwargs['offer'], replies=None)

    def get_serializer_class(self, *args, **kwargs):
        if self.request.method == 'POST':
            return CommentCreateSerializer
        if self.request.method == 'GET':
            return CommentSerializer


class CommentVoteView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()
    serializer_class = CommentVoteSerializer


class CommentReplyView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()
    serializer_class = CommentCreateSerializer


class CommentDestroyView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
