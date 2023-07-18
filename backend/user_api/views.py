from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from songs.models import Songs
from rest_framework import permissions, status
from .validations import custom_validation, validate_username, validate_password


class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	#authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_username(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		userserializer = UserSerializer(request.user)
		#songserializer = SongSerializer(request.user.FavoriteSongs.all())
		print(f"request.user \ntype: {type(request.user)}\n, request {request.user}\n")
		response = {
			'user': userserializer.data
    		#'favorite songs': songserializer.data
		}
		return Response(response, status=status.HTTP_200_OK)

class UserLike(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	def post(self, request):
		userserializer = UserSerializer(request.user)
		#songserializer = SongSerializer(request.user.FavoriteSongs.all())
		print(f"request \nrequest {request.data}\n user {request.user}")	
		user = request.user
		song = Songs.objects.get(name=request.data['song'])
		user.favoritesongs.add(song)
		response = {
			'user': userserializer.data
    		#'favorite songs': songserializer.data
		}
		return Response(response, status=status.HTTP_200_OK)