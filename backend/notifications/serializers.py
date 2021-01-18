from rest_framework import serializers

from .models import Notification


class NotificationsSerializer(serializers.ModelSerializer):
    recipient = serializers.CharField(source="recipient.email")
    pub_date = serializers.CharField(source="pub_date_display")

    class Meta:
        model = Notification
        fields = [
            'id',
            'recipient',
            'body',
            'pub_date',
            'viewed',
        ]
