from rest_framework.generics import ListAPIView
from .models import Notifications
from .serializers import NotificationsSerializer
from rest_framework.permissions import IsAuthenticated


class NotificationsView(ListAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notifications.objects.filter(recipient=self.request.user)

    serializer_class = NotificationsSerializer
