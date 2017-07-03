from django.contrib import admin
from tetris.models import Game, Event

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ["id","user","started"]
    #search_fields = ["user"]
    #list_filter = ["created"]

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ["id","game","time"]
