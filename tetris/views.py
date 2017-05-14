from django.shortcuts import render


def index(request):
    return render(request, "index.html", {})


def tictactoe(request):
    return render(request, "tictactoe.html", {})


def tetris(request):
    return render(request, "tetris.html", {})
