# Generated by Django 2.2.11 on 2020-03-13 12:51

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_tag_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='image2',
            field=models.ImageField(null=True, upload_to=core.models.recipe_image_file_path),
        ),
    ]