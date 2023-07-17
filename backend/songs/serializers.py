from rest_framework import serializers
from .models import Songs, Queries
from user_api.models import AppUser

class SongSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    period = serializers.DateField()
    singer = serializers.CharField(required=True)
    style = serializers.CharField(required=False)
    mood = serializers.CharField(required=False)
    class Meta:
        model = Songs
        fields = ['name', 'period', 'singer', 'style', 'mood']
    def create(self, validated_data):
        if not validated_data.get('style'):
            validated_data['style'] = "None"
        if not validated_data.get('mood'):
            validated_data['mood'] = "happy"
        if validated_data.get('owner'):
            del validated_data["owner"]
        print(f"validated_data\ntype: {type(validated_data)}\ndata: {validated_data}")
        return  super().create(validated_data)

class QuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Queries
        fields = ['singer', 'mood', 'text']
        #fields = ['query']