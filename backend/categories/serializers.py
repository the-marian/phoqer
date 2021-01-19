from rest_framework import serializers

from .models import ChildCategories, ParentCategories


class ChildCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ChildCategories
        fields = [
            'name',
            'slug',
        ]


class ParentCategorySerializer(serializers.ModelSerializer):
    sub_categories = ChildCategorySerializer(many=True, read_only=True)

    class Meta:
        model = ParentCategories
        fields = [
            'image',
            'name',
            'slug',
            'sub_categories',
        ]
