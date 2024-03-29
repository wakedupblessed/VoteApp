# Generated by Django 4.1.7 on 2023-04-20 11:51

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Poll',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=300)),
                ('number_of_vote', models.IntegerField(default=0)),
                ('creation_date', models.DateTimeField(default=datetime.datetime(2023, 4, 20, 14, 51, 26, 485531))),
                ('is_anonymous', models.BooleanField(default=False)),
                ('end_date', models.DateTimeField(default=datetime.datetime(2023, 4, 21, 14, 51, 26, 485531))),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='authored_polls', to=settings.AUTH_USER_MODEL)),
                ('responders', models.ManyToManyField(related_name='responded_polls', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=80)),
                ('question_type', models.CharField(choices=[('SingleChoice', 'SINGLE_OPTION'), ('MultipleChoice', 'MULTIPLE_OPTION'), ('OpenAnswer', 'OPEN_ANSWER')], default='SingleChoice', max_length=50)),
                ('poll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.poll')),
            ],
        ),
        migrations.CreateModel(
            name='PrivatePoll',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('poll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.poll')),
                ('pollees', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Option',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=40)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.question')),
            ],
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('open_answer', models.TextField(blank=True, null=True)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.question')),
                ('selected_options', models.ManyToManyField(blank=True, to='polls.option')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
