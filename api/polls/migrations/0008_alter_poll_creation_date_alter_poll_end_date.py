# Generated by Django 4.1.7 on 2023-05-25 09:19

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0007_alter_answer_multiple_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='poll',
            name='creation_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 5, 25, 12, 19, 7, 790835)),
        ),
        migrations.AlterField(
            model_name='poll',
            name='end_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 5, 26, 12, 19, 7, 790835), null=True),
        ),
    ]
