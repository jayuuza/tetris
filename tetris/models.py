from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User

# Create your models here.
class Game(models.Model):
    # id = models.CharField(max_length=200, db_index=True, unique=True, primary_key=True)
    id = models.AutoField(db_index=True, unique=True, primary_key=True)
    user = models.ForeignKey(User)
    started = models.DateTimeField(auto_now_add=True)
    # data = JSONField()
    #start_date = models.

class Event(models.Model):
    id = models.AutoField(db_index=True, unique=True, primary_key=True)
    game = models.ForeignKey(Game)
    type = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    time = models.DateTimeField(auto_now_add=True)
