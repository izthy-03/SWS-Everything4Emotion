from django.shortcuts import render
from django.http import Http404

from .serializers import SongSerializer, QuerySerializer
from .models import Songs, Queries

from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

# just list ???
# it depends on whether we allow users to upload their own songs
class SongList(APIView):

    def get(self, request, format = None):
        songs = Songs.objects.all()
        serializer = SongSerializer(songs, many = True, context = {'request':request})
        return Response(serializer.data)
    def post(self, request, format = None):
        serializer = SongSerializer(data=request.data, context = {'request':request})
        if serializer.is_valid():
            serializer.save(owner = self.request.user)
            return Response (serializer.data, status = status.HTTP_201_CREATED)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class QueryList(APIView):

    def get(self, request, format = None):
        query = Queries.objects.all()
        serializer = QuerySerializer(query, many = True, context = {'request':request})
        return Response(serializer.data)
    
    def post(self, request, format = None):
        serializer = QuerySerializer(data=request.data, context = {'request':request})
        if serializer.is_valid():
            print(serializer.__dict__)
            serializer.save()
            return Response(serializer.data, status=status. HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class QueryDetail(APIView):


    def get_query(self, pk):
        try:
            return Queries.objects.get(pk = pk)
        except Queries.DoesNotExist:
            raise Http404

    def get(self, request, pk, format = None):
        query = self.get_query(pk)
        serializer = QuerySerializer(query, context = {'request':request})
        return Response(serializer.data)
    
    def post(self, request, format = None):
        serializer = QuerySerializer(data=request.data, context = {'request':request})
        if serializer.is_valid():
            print(serializer.__dict__())
            serializer.save()
            return Response(serializer.data, status=status. HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    