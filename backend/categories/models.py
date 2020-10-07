from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class ParentCategories(models.Model):
    image = models.URLField()
    is_active = models.BooleanField()
    name = models.CharField(max_length=50)
    priority = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(3)])
    slug = models.SlugField(primary_key=True, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['priority']


class ChildCategories(models.Model):
    name = models.CharField(max_length=50)
    parent = models.ForeignKey(ParentCategories, related_name='sub_categories', on_delete=models.CASCADE)
    slug = models.SlugField()

    def __str__(self):
        return self.name
