from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from upload.views import image_upload

schema_view = get_schema_view(
    openapi.Info(
        title="Snippets API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("api/upload/", image_upload, name="upload"),
    path("admin/", admin.site.urls),

    # REST-FRAMEWORK URLS
    path('api/v1/categories/', include('categories.urls', namespace='categories')),
    path('api/v1/offers/', include('offers.urls', namespace='offers')),

    # Users
    path('api/v1/', include('djoser.urls')),
    path('api/v1/users/', include('users.urls', namespace='users')),

    # SWAGGER URL
    path('api/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='swagger'),

    # AUTH
    path('api/v1/auth/', include('djoser.urls.authtoken')),
    path('api/v1/auth/', include('djoser.urls.jwt')),
]

if bool(settings.DEBUG):
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
