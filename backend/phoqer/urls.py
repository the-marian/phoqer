from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from upload.views import ImageUpload

urlpatterns = [
    path('api/v1/upload/', ImageUpload.as_view(), name='upload'),
    path('admin/', admin.site.urls),

    # REST-FRAMEWORK URLS
    path('api/v1/categories/', include('categories.urls', namespace='categories')),

    # SWAGGER URL
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/swagger/',
         SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

    # AUTH
    path('api/v1/auth/', include('djoser.urls.authtoken')),
]

if bool(settings.DEBUG):
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
