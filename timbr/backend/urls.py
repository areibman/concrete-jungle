from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('user_responses', views.save_user_feedback, name='user_responses'),
]
