from django.contrib import admin

from .models import ParentCategories, ChildCategories

admin.site.register(ParentCategories)
admin.site.register(ChildCategories)
