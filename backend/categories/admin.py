from django.contrib import admin
from .models import ParentCategories, ChildCategories

# Register your models here.
admin.site.register(ParentCategories)
admin.site.register(ChildCategories)
