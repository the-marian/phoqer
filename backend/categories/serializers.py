from rest_framework import serializers
from .models import ParentCategories, ChildCategories


class ChildCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ChildCategories
        fields = ['name']


class ParentCategorySerializer(serializers.ModelSerializer):
    sub_categories = ChildCategorySerializer(many=True, read_only=True)

    class Meta:
        model = ParentCategories
        fields = ['name', 'is_active', 'priority', 'sub_categories']
