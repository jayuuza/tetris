from django.db import models
from django.contrib.auth.models import User

class GamingSession(models.Model):
    id = models.AutoField(db_index=True, unique=True, primary_key=True)
    user = models.ForeignKey(User)
    started = models.DateTimeField(auto_now_add=True)

class Event(models.Model):
    id = models.AutoField(db_index=True, unique=True, primary_key=True)
    game = models.ForeignKey(GamingSession)
    type = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    time = models.DateTimeField(auto_now_add=True)

class GameInfo(models.Model):
    id = models.AutoField(db_index=True, unique=True, primary_key=True)
    game = models.ForeignKey(GamingSession)
    time_taken = models.IntegerField(default=0)
    score = models.IntegerField(default=0)