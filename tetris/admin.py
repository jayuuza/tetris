from django.contrib import admin
from tetris.models import Game

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ["id","user","data"]
    #search_fields = ["user"]
    #list_filter = ["created"]
