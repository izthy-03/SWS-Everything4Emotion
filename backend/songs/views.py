from django.shortcuts import render
from django.http import Http404

from .serializers import SongSerializer, QuerySerializer, SpotifySongsSerializer
from .models import Songs, Queries
from user_api.models import AppUser
from externalAPI.chatGPT import gpt_35_api_non_stream as gpt
from externalAPI.spotify import Spotify 
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication


# just list ???
# it depends on whether we allow users to upload their own songs
class SongList(APIView):
    def get(self, request, format=None):
        songs = Songs.objects.all()
        serializer = SongSerializer(songs, many=True, context={"request": request})
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = SongSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#GPT -> mood period singer etc, --> filter --> recommend
class QueryList(APIView):
  #  permission_classes = (permissions.IsAuthenticated,)
  #  authentication_classes = (SessionAuthentication,)
    def get(self, request, format=None):
        query = Queries.objects.all()
        serializer = QuerySerializer(query, many=True, context={"request": request})
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = QuerySerializer(data=request.data, context={"request": request})
        user = request.user
        if serializer.is_valid():
            result = gpt(serializer.data["mood"])
            print(request.data, serializer.validated_data) 
            # songs = Songs.objects.filter(appuser=user)
            # if songs.exists() and request.data.get('mood'):
            #     songs = songs.filter(mood=request.data['mood'])
            # songserializer = SongSerializer(songs[:2], many=True)
            
            tracks = Spotify(request.data['mood'])
            songserializer = SpotifySongsSerializer(tracks, many = True)
            return Response(songserializer.data, status=status.HTTP_200_OK)
            # if result[0] == True:
            #     return Response(result[1], status=status.HTTP_201_CREATED)
            # # .save()
            # else:
            #     return Response(
            #         "chatGPT service error",
            #         status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            #     )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QueryDetail(APIView):
    def get_query(self, pk):
        try:
            return Queries.objects.get(pk=pk)
        except Queries.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        query = self.get_query(pk)
        serializer = QuerySerializer(query, context={"request": request})
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = QuerySerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            print(serializer.__dict__())
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
