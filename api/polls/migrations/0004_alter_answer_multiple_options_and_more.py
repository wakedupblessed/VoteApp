# Generated by Django 4.1.7 on 2023-05-17 19:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0003_alter_answer_id_alter_option_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='multiple_options',
            field=models.ManyToManyField(blank=True, null=True, related_name='multiple_options', to='polls.option'),
        ),
        migrations.AlterField(
            model_name='poll',
            name='creation_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 5, 17, 22, 46, 13, 507516)),
        ),
        migrations.AlterField(
            model_name='poll',
            name='end_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 5, 18, 22, 46, 13, 507516)),
        ),
    ]
