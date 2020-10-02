from django.urls import path
from . import views

app_name = 'categories'

urlpatterns = [
    path('categories/', views.ParentCategoryView.as_view(), name='categories'),
]
