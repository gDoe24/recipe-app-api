import uuid
import os

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
										PermissionsMixin

from django.conf import settings


def recipe_image_file_path(instance, filename):
	ext = filename.split('.')[-1]
	filename = f'{uuid.uuid4()}.{ext}'

	return os.path.join('uploads/recipe/', filename)

class UserManager(BaseUserManager):

	def create_user(self, email, password=None, **extra_fields):
		#Create and save new user
		if not email:
			raise ValueError('Type in proper email')
		user=self.model(email=self.normalize_email(email), **extra_fields)
		user.set_password(password)
		user.save(using=self._db)

		return user

	def create_superuser(self,email,password=None,**extra_fields):
		#Create and save a new superuser
		user=self.create_user(email,password)
		user.is_staff=True
		user.is_superuser=True
		user.save(using=self._db)

		return user

class User(AbstractBaseUser, PermissionsMixin):
	#custom user model for email
	email=models.EmailField(max_length=255, unique=True)
	name=models.CharField(max_length=255)
	is_active=models.BooleanField(default=True)
	is_staff=models.BooleanField(default=False)

	objects=UserManager()

	USERNAME_FIELD = "email"


class Tag(models.Model):
	#Tag for recipe
	name=models.CharField(max_length=255)
	user=models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		)
	image = models.ImageField(null=True, upload_to=recipe_image_file_path)
	image2 = models.ImageField(null=True, upload_to=recipe_image_file_path)
	def __str__(self):
		#String Representation returned for tag
		return self.name

class Ingredient(models.Model):
	#Ingredient for recipe
	name=models.CharField(max_length=255)
	amount=models.PositiveSmallIntegerField(default=1)
	unit=models.CharField(max_length=30,default='cup')
	user=models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		)

	def __str__(self):

		return self.name


class Recipe(models.Model):
	#Recipe object
	creation_date = models.DateTimeField(auto_now_add=True)
	class Meta:
		get_latest_by = 'creation_date'

	user = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		null=True,
		)
	title = models.CharField(max_length=255)
	time = models.IntegerField()
	price = models.DecimalField(max_digits=5, decimal_places=2)
	servings=models.IntegerField(default=1)
	link = models.URLField(max_length=200, blank=True)
	ingredients = models.ManyToManyField('Ingredient')
	tags = models.ManyToManyField('Tag')
	description = models.TextField(null=True)
	methods = models.TextField(default="Step 1: x")
	image = models.ImageField(null=True, upload_to=recipe_image_file_path)

	def __str__(self):
		return self.title
