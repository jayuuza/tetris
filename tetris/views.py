from django.shortcuts import render
from django.db import models
from models import Game, Event
from django.http import HttpResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
import json

# from django.contrib.auth.models import User

def index(request):
    return render(request, "index.html", {})


def tictactoe(request):
    return render(request, "tictactoe.html", {})

def tetris(request):
    NewGame = Game(user=request.user)
    NewGame.save()
    game_data = {"game": NewGame.id}
    return render(request, "tetris.html", game_data)

@csrf_exempt
def log_game(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        game = Game.objects.get(id=data["game_id"])
        event = Event(game=game, type=data["action"], state=data["state"])
        event.save()
        return HttpResponse('Event Created')
    else:
        return redirect('tetris.views.tetris')

