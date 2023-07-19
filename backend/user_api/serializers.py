from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError

UserModel = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ("email", "password")

    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(
            email=clean_data["email"], password=clean_data["password"]
        )
        # default name is the email
        if not clean_data["username"]:
            user_obj.username = clean_data["email"]
        else:
            user_obj.username = clean_data["username"]
        user_obj.save()
        return user_obj


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    # username = serializers.CharField()
    password = serializers.CharField()

    ##
    def check_user(self, clean_data):
        user = authenticate(
            username=clean_data["email"], password=clean_data["password"]
        )
        if not user:
            raise ValidationError("user not found or wrong password")
        return user


class UserSerializer(serializers.ModelSerializer):
    favoritesongs = serializers.PrimaryKeyRelatedField(
        many=True, required=False, read_only=True
    )
    class Meta:
        model = UserModel
        fields = ("email", "username", "favoritesongs")
