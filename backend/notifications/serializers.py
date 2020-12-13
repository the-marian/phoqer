from rest_framework import serializers
from .models import Notifications


class NotificationsSerializer(serializers.ModelSerializer):
    recipient = serializers.CharField(source="recipient.email")
    # pub_date = serializers.CharField(source="pub_date_display")

    class Meta:
        model = Notifications
        fields = [
            'recipient',
            'body',
            'pub_date',
            'pub_date_display',
        ]
