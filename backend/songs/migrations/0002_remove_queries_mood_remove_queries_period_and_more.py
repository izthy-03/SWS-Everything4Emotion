# Generated by Django 4.2.3 on 2023-07-12 03:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='queries',
            name='mood',
        ),
        migrations.RemoveField(
            model_name='queries',
            name='period',
        ),
        migrations.RemoveField(
            model_name='queries',
            name='singer',
        ),
        migrations.RemoveField(
            model_name='queries',
            name='text',
        ),
        migrations.AddField(
            model_name='queries',
            name='query',
            field=models.JSONField(null=True),
        ),
    ]
