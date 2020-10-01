from rest_framework.generics import ListAPIView
from .models import ParentCategories, ChildCategories
from .serializers import ParentCategorySerializer, ChildCategorySerializer


class ParentCategoryView(ListAPIView):
    queryset = ParentCategories.objects.filter(is_active=True)
    serializer_class = ParentCategorySerializer


class ChildCategoryView(ListAPIView):
    queryset = ChildCategories.objects.all()
    serializer_class = ChildCategorySerializer
