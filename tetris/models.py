from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User

# Create your models here.
class Game(models.Model):
    id = models.CharField(max_length=200, db_index=True, unique=True, primary_key=True)
    user = models.ForeignKey(User)
    data = JSONField()
    #start_date = models.
