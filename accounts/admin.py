from django.contrib import admin

# Register your models here.
from accounts.models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ["id","highscore","user"]
    search_fields = []
    list_filter = ["highscore"]
