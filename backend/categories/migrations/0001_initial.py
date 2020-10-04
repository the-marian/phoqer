# Generated by Django 3.0.7 on 2020-09-28 19:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ParentCategories',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('image', models.URLField()),
                ('is_active', models.BooleanField()),
                ('priority', models.IntegerField(max_length=10)),
            ],
            options={
                'ordering': ['priority'],
            },
        ),
        migrations.CreateModel(
            name='ChildCategories',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('parent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='categories.ParentCategories')),
            ],
        ),
    ]