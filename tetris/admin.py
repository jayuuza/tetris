from django.contrib import admin
from tetris.models import GamingSession, Event, GameInfo

@admin.register(GamingSession)
class GameAdmin(admin.ModelAdmin):
    list_display = ["id","user","started"]

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ["id","game","time"]


@admin.register(GameInfo)
class GameAdmin(admin.ModelAdmin):
    list_display = ["id","game","time_taken", "score"]
