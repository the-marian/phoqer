import uuid

from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

from categories.models import ChildCategories, ParentCategories


class Offer(models.Model):
    class Per(models.TextChoices):
        HOUR = 'HOUR', _('Hour')
        DAY = 'DAY', _('Day')
        WEEK = 'WEEK', _('Week')
        MONTH = 'MONTH', _('Month')

    class Currency(models.TextChoices):
        EUR = 'EUR', _('Euro')
        USD = 'USD', _('Dollar')
        UAH = 'UAH', _('Hryvnia')
        PLN = 'PLN', _('Złoty')

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.OneToOneField(ParentCategories, on_delete=models.PROTECT)
    city = models.CharField(max_length=50)
    currency = models.CharField(max_length=3, choices=Currency.choices)
    deposit_val = models.PositiveIntegerField()
    description = models.TextField()
    doc_needed = models.BooleanField()
    cover_image = models.URLField()
    max_rent_per = models.CharField(max_length=5, choices=Per.choices, blank=True, null=True)
    min_rent_per = models.CharField(max_length=5, choices=Per.choices, blank=True, null=True)
    max_rent_value = models.SmallIntegerField(blank=True, null=True)
    min_rent_value = models.SmallIntegerField(blank=True, null=True)
    per = models.CharField(max_length=5, choices=Per.choices)
    price = models.PositiveIntegerField()
    promote_til_date = models.DateField(blank=True, null=True)
    pud_date = models.DateField(auto_now=True)
    extra_requirements = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=50)
    sub_category = models.OneToOneField(ChildCategories, on_delete=models.PROTECT)
    title = models.CharField(max_length=120)
    views = models.PositiveIntegerField(default=0)
    favourite = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='user_favourite')

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['pud_date']

class OfferImages(models.Model):
    offer = models.ForeignKey(Offer, related_name='offer_images', on_delete=models.CASCADE)
    url = models.URLField()
    name = models.CharField(max_length=50)
