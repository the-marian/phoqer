from rest_framework.generics import ListAPIView

from .models import ParentCategories
from .serializers import ParentCategorySerializer


class CategoriesView(ListAPIView):
    queryset = ParentCategories.objects.filter(is_active=True)
    serializer_class = ParentCategorySerializer
