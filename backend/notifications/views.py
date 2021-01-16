from rest_framework.generics import ListAPIView
from .models import Notification
from .serializers import NotificationsSerializer
from rest_framework.permissions import IsAuthenticated


class NotificationsView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationsSerializer

    def get_queryset(self):
        return Notification.objects.filter(recipient=self.request.user)
