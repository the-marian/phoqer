from django.db import models
from django.conf import settings


class Notification(models.Model):
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    body = models.TextField(max_length=50)
    pub_date = models.DateTimeField(auto_now_add=True)
    viewed = models.BooleanField(default=False)

    @property
    def pub_date_display(self):
        return self.pub_date.strftime("%Y-%m-%d %H:%M:%S")
