from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name="index" ),
    path('allTasks', AllTasks, name="allTasks" ),
    path('addTasks', AddTasks, name="AddTasks" ),
    path('deleteTask/<int:task_id>', DeleteTasks, name="DeleteTasks" ),
]