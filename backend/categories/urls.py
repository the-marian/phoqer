from django.urls import path
from . import views

app_name = 'categories'

urlpatterns = [
    path('parent-categories/', views.ParentCategoryView.as_view(), name='parent-categories'),
    path('child-categories/', views.ChildCategoryView.as_view(), name='child-categories'),
]
