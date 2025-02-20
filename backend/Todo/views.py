from django.shortcuts import render
from .models import *
from .serializers import *
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


# Create your views here.

def index(request):
    return render(request,"index.html")

api_view(["GET"])
def AllTasks(request):
    tasks = Task.objects.all()
    serialized = TaskSerializers(tasks,many=True)
    return JsonResponse(serialized.data, safe=False)

@api_view(["POST"])
def AddTasks(request):
    if request.method == "POST":
        print(request.data)
        _title = request.data.get("title")
        _description = request.data.get("description")
        _status_id = request.data.get("status")
        _priority = request.data.get("priority")
        
        try:
           _status = Column.objects.get(id=_status_id)
        except Column.DoesNotExist:
            return Response({"error": "Bad Status_id"})
        
        task = Task(
            title=_title,
            description=_description,
            status=_status,
            priority=_priority,
            assigned_to=request.user,
        )
        task.save()
        return Response({'message': 'Created'}, status=status.HTTP_201_CREATED)

    return Response({'message': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(["DELETE"])
def DeleteTasks(request, task_id):
    task = get_object_or_404(Task, id=task_id)  # Ha nincs ilyen feladat, 404-es hibát dob
    task.delete() 
    return Response({"message": "Task deleted successfully"}, status=204)
    



    