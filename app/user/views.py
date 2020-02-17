from rest_framework import generics, authentication, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from core.models import Recipe, Tag
from django.views.generic import TemplateView
from django.core.paginator import Paginator

from knox.models import AuthToken

from django.shortcuts import render, get_object_or_404, redirect

from user.serializers import UserSerializer, AuthTokenSerializer, LoginSerializer

from django.contrib.auth import logout as django_logout
import json
from django.http import Http404, HttpResponse

from user.forms import AddIngredientForm

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
#Login API
class LoginAPI(generics.GenericAPIView):

	serializer_class=UserSerializer
	authentication_classes = (authentication.TokenAuthentication,)
	permission_classes = (permissions.IsAuthenticated,)

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data

		return Response({
			"user": UserSerializer(user,
			context = self.get_serializer_context()).data,
			"token": AuthToken.objects.create(user)
			})

#Logout API
class LogoutView(APIView):
	authntication_classes = (authentication.TokenAuthentication,)

	def post(self, request):
		django_logout(request)
		return Response(status=204)

def home(request):
	tag = Tag.objects
	recipe_list = Recipe.objects.all().order_by('-creation_date')

	paginator = Paginator(recipe_list, 3)
	page = request.GET.get('page')
	recipe = paginator.page(1)

	return render(request, 'user/home.html', {'recipes':recipe})


class AddIngredientView(TemplateView):
	template_name= "user/add_ingredients.html"

	def get(self,request):
		form=AddIngredientForm()
		return render(request,"user/add_ingredients.html", {'form':form})

	def post(self, request):
		form=AddIngredientForm(request.POST)
		if form.is_valid():
			ingredient = form.save(commit=False)
			form = AddIngredientForm()
			ingredient.user = request.user
			ingredient.save()

		args = {'form':form, 'text':text}
		return render(request, self.template_name,args)