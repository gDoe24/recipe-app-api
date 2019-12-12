from rest_framework import generics, authentication, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings

from django.shortcuts import render, get_object_or_404

from user.serializers import UserSerializer, AuthTokenSerializer

class CreateUserView(generics.CreateAPIView):
	#Create a new user
	serializer_class=UserSerializer

class CreateTokenView(ObtainAuthToken):
	#authenticate user
	serializer_class= AuthTokenSerializer
	renderer_classes= api_settings.DEFAULT_RENDERER_CLASSES

class ManageUserView(generics.RetrieveUpdateAPIView):
	#View to manage the authenticated user

	serializer_class = UserSerializer
	authentication_classes = (authentication.TokenAuthentication,)
	permission_classes = (permissions.IsAuthenticated,)

	def get_object(self):
		#retrieve and return the authenticated user
		return self.request.user

def home(request):

	return render(request, 'user/home.html')