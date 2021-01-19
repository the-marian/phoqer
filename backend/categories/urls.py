from django.urls import path

from . import views

app_name = 'categories'

urlpatterns = [
    path('', views.CategoriesView.as_view(), name='categories'),
]
