# Generated by Django 3.1.2 on 2020-10-11 00:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('offers', '0005_auto_20201007_1555'),
    ]

    operations = [
        migrations.AlterField(
            model_name='offer',
            name='deposit_val',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
