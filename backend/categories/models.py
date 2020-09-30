from django.db import models

# Create your models here.


class ParentCategories(models.Model):
    name = models.CharField(max_length=50)
    image = models.URLField()
    is_active = models.BooleanField()
    priority = models.IntegerField()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['priority']


class ChildCategories(models.Model):
    name = models.CharField(max_length=50)
    parent = models.ForeignKey(ParentCategories, related_name='sub_categories', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
