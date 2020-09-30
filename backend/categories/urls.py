from django.urls import path, include
from . import views
from rest_framework import routers


categories_router = routers.DefaultRouter()
categories_router.register('parent-categories', views.ParentCategoryViewSet, basename='parent-categories')
categories_router.register('child-categories', views.ChildCategoryViewSet, basename='child-categories')
app_name = 'categories'

urlpatterns = [
    path('', include(categories_router.urls))
]
