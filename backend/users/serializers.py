from djoser.conf import settings
from rest_framework import serializers


class TokenSerializer(serializers.ModelSerializer):
    auth_token = serializers.CharField(source="key")
    birth_date = serializers.CharField(source="user.birth_date")
    email = serializers.CharField(source="user.email")
    location = serializers.CharField(source="user.location")

    class Meta:
        model = settings.TOKEN_MODEL
        fields = (
            "auth_token",
            "birth_date",
            "email",
            "location",
        )
