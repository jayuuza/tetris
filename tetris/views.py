from django.shortcuts import render
from django.db import models
from models import GamingSession, Event, GameInfo
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
    NewGame = GamingSession(user=request.user)
    NewGame.save()
    game_data = {"game": NewGame.id}
    return render(request, "tetris.html", game_data)

@csrf_exempt
def log_event(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        game = GamingSession.objects.get(id=data["game_id"])
        event = Event(game=game, type=data["action"], state=data["state"])
        event.save()
        return HttpResponse('Event Created')
    else:
        return redirect('tetris.views.tetris')

@csrf_exempt
def log_game(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        game = GamingSession.objects.get(id=data["game_id"])
        gameinfo = GameInfo(game=game, score=data["score"], time_taken=data["time_taken"])
        gameinfo.save()
        return HttpResponse('Game Info Created')
    else:
        return redirect('tetris.views.tetris')

