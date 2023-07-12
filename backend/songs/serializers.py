from rest_framework import serializers
from .models import Songs, Queries

class SongSerializer(serializers.ModelSerializer):

    class Meta:
        model = Songs
        fields = ['name', 'period', 'singer', 'style', 'mood']

class QuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Queries
        fields = ['singer', 'mood', 'text']
        #fields = ['query']