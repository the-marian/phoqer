from django.contrib import admin

from users.models import (
    CommunicationRating,
    DescriptionRating,
    User,
    UserDislike,
    UserLike,
)

admin.site.register(User)
admin.site.register(UserLike)
admin.site.register(UserDislike)
admin.site.register(CommunicationRating)
admin.site.register(DescriptionRating)
