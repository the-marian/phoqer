from django.contrib import admin

from .models import ChildCategories, ParentCategories

admin.site.register(ParentCategories)
admin.site.register(ChildCategories)
