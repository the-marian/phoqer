# Create your views here.
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from comments.models import Comment
from comments.serializers import CommentSerializer, CommentCreateSerializer


class CommentsView(ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    lookup_field = 'offer'

    def get_queryset(self):
        return Comment.objects.filter(offer=self.kwargs['offer'])


class CreateCommentView(CreateAPIView):
    serializer_class = CommentCreateSerializer
    queryset = Comment.objects.all()
    permission_classes = [IsAuthenticated]
    lookup_field = 'offer'
