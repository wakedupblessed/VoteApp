# Generated by Django 4.1.7 on 2023-05-15 23:16

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0002_privatepollrespondents_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='id',
            field=models.CharField(max_length=20, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='option',
            name='id',
            field=models.CharField(max_length=20, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='poll',
            name='creation_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 5, 16, 2, 16, 50, 705412)),
        ),
        migrations.AlterField(
            model_name='poll',
            name='end_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 5, 17, 2, 16, 50, 705412)),
        ),
        migrations.AlterField(
            model_name='poll',
            name='id',
            field=models.CharField(max_length=20, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='privatepollrespondents',
            name='id',
            field=models.CharField(max_length=20, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='question',
            name='id',
            field=models.CharField(max_length=20, primary_key=True, serialize=False),
        ),
    ]
