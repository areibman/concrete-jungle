# Generated by Django 2.2.4 on 2019-08-24 03:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coordinatesrequested',
            name='user_agrees_with_classification',
            field=models.BooleanField(blank=True, null=True),
        ),
    ]