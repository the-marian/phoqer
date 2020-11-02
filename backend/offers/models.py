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

    class Status(models.TextChoices):
        DRAFT = 'DRAFT', _('Draft')
        REVIEW = 'REVIEW', _('Review')
        ACTIVE = 'ACTIVE', _('Active')
        REJECTED = 'REJECTED', _('Rejected')
        INACTIVE = 'INACTIVE', _('Inactive')
        IN_RENT = 'IN_RENT', _('In rent')
        ARCHIVED = 'ARCHIVED', _('Archived')
        FROZEN = 'FROZEN', _('Frozen')

    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.ForeignKey(ParentCategories, on_delete=models.PROTECT)
    city = models.CharField(max_length=50)
    cover_image = models.URLField()
    currency = models.CharField(max_length=3, choices=Currency.choices)
    deposit_val = models.PositiveIntegerField(default=0)
    description = models.TextField()
    doc_needed = models.BooleanField()
    extra_requirements = models.TextField(blank=True, null=True)
    favourite = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='favourite_offers')
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    is_deliverable = models.BooleanField()
    max_rent_per = models.CharField(max_length=5, choices=Per.choices, blank=True, null=True)
    max_rent_value = models.SmallIntegerField(blank=True, null=True)
    min_rent_per = models.CharField(max_length=5, choices=Per.choices, blank=True, null=True)
    min_rent_value = models.SmallIntegerField(blank=True, null=True)
    per = models.CharField(max_length=5, choices=Per.choices)
    price = models.PositiveIntegerField()
    promote_til_date = models.DateField(blank=True, null=True)
    pud_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=8, choices=Status.choices, default=Status.DRAFT)
    sub_category = models.ForeignKey(ChildCategories, on_delete=models.PROTECT)
    title = models.CharField(max_length=120)
    views = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['pud_date']


class OfferImages(models.Model):
    name = models.CharField(max_length=50)
    offer = models.ForeignKey(Offer, related_name='offer_images', on_delete=models.CASCADE)
    url = models.URLField()

    def __str__(self):
        return self.name
