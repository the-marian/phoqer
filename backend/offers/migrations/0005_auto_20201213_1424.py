# Generated by Django 3.1.2 on 2020-12-13 14:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0003_remove_childcategories_test_field'),
        ('offers', '0004_auto_20201213_1315'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='offer',
            name='max_rent_per',
        ),
        migrations.RemoveField(
            model_name='offer',
            name='min_rent_per',
        ),
        migrations.RemoveField(
            model_name='offer',
            name='per',
        ),
        migrations.AddField(
            model_name='offer',
            name='max_rent',
            field=models.PositiveSmallIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='offer',
            name='min_rent',
            field=models.PositiveSmallIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='offer',
            name='sub_category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='categories.childcategories'),
        ),
    ]
