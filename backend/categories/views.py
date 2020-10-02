from rest_framework.generics import ListAPIView
from .models import ParentCategories, ChildCategories
from .serializers import ParentCategorySerializer, ChildCategorySerializer


class CategoriesView(ListAPIView):
    queryset = ParentCategories.objects.filter(is_active=True)
    serializer_class = ParentCategorySerializer
