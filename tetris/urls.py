from django.conf.urls import url
from tetris import views

urlpatterns = [
    url(r'^$', views.index, name='home'),
    url(r'^tictactoe/$', views.tictactoe, name='tictactoe'),
    url(r'^tetris/$', views.tetris, name='tetris'),
    url(r'^tetris/log_event/$', views.log_event, name='tetrislogging1'),
    url(r'^tetris/log_game/$', views.log_game, name='tetrislogging2'),

]
