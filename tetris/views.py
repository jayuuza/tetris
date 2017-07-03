from django.shortcuts import render
from django.db import models
from models import Game, Event


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


def log_game(request):
    game = Game.objects.get(game_id=request.POST.game_id)
    event = Event(game=game, type=request.POST.action, state=request.POST.state)
    event.save()