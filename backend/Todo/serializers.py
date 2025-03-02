from rest_framework import serializers
from .models import *
#from django.contrib.auth.models import User

'''class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['id', 'username']
        '''

class TaskSerializers(serializers.ModelSerializer):
    #assigned_to = UserSerializer(read_only=True)
    
    class Meta():
        model = Task
        fields = '__all__'
        depth = 1
        
class ColumnSerializers(serializers.ModelSerializer):
    class Meta():
        model = Column
        fields = '__all__'
        depth = 1