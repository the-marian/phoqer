from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView
import pdb
from rest_framework import viewsets
from rest_framework.response import Response
from .models import ParentCategories, ChildCategories
from .serializers import ParentCategorySerializer, ChildCategorySerializer
# Create your views here.


class ParentCategoryViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = ParentCategories.objects.filter(is_active=True)
        serializer = ParentCategorySerializer(queryset, many=True)
        return Response(serializer.data)


class ChildCategoryViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = ChildCategories.objects.all()
        serializer = ChildCategorySerializer(queryset, many=True)
        return Response(serializer.data)
