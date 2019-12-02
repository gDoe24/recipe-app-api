from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Recipe, Tag, Ingredient
from recipe.serializers import RecipeSerializer, RecipeDetailSerializer

RECIPES_URL = reverse('recipe:recipe-list')


def detail_url(recipe_id):
	#return recipe detail URL
	return reverse('recipe:recipe-detail', args=[recipe_id])

def sample_tag(user,name='Main Course'):
	#create and return a sample tag
	return Tag.objects.create(user=user, name=name)

def sample_ingredient(user,name='Cinnamon'):
	#Create and return a sample ingredient
	return Ingredient.objects.create(user=user,name=name)

def sample_recipe(user, **params):
	#Create and return a sample recipe
	defaults = {
	'title':'Sample Recipe',
	'time': 10,
	'price':5.00,
	}
	defaults.update(params)

	return Recipe.objects.create(user=user, **defaults)

class PublicRecipeApiTests(TestCase):
	#Test recipe access for unauthenticated user
	def setUp(self):
		self.client = APIClient()

	def test_required_auth(self):
        #Test the authenticaiton is required
		res = self.client.get(RECIPES_URL)

		self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

class PrivateRecipeApiTests(TestCase):
	#Test unauthenticated recipe API access
	def setUp(self):
		self.client=APIClient()
		self.user=get_user_model().objects.create_user(
			"test@londonappdev.com",
			"test1234"
		)

		self.client.force_authenticate(self.user)

	def test_retrieve_recipes(self):
		#Retrieve a sample list of recipes
		sample_recipe(user=self.user)
		sample_recipe(user=self.user)

		res=self.client.get(RECIPES_URL)

		recipes = Recipe.objects.all().order_by('-id')
		serializer = RecipeSerializer(recipes, many=True)

		self.assertEqual(res.status_code, status.HTTP_200_OK)
		self.assertEqual(res.data, serializer.data)

	def test_recipes_limited_to_user(self):
		#Test receiving personal recipes
		user2= get_user_model().objects.create_user(
			'other@londonappdev.com',
			'testpass'
		)
		sample_recipe(user=user2)
		sample_recipe(user=self.user)

		res = self.client.get(RECIPES_URL)

		recipes = Recipe.objects.filter(user=self.user)
		serializer = RecipeSerializer(recipes, many=True)

		self.assertEqual(res.status_code, status.HTTP_200_OK)
		self.assertEqual(len(res.data),1)
		self.assertEqual(res.data, serializer.data)

	def test_view_recipe_detail(self):
		#Test viewing a recipe detail
		recipe = sample_recipe(user=self.user)
		recipe.tags.add(sample_tag(user=self.user))
		recipe.ingredients.add(sample_ingredient(user=self.user))

		url = detail_url(recipe.id)
		res = self.client.get(url)

		serializer = RecipeDetailSerializer(recipe)
		self.assertEqual(res.data, serializer.data)

	def test_create_basic_recipe(self):
		#Test creating recipe
		payload = {
			'title':'Chocolate Cheesecake',
			'time': 30,
			'price':5.00,
		}

		res = self.client.post(RECIPES_URL, payload)

		self.assertEqual(res.status_code, status.HTTP_201_CREATED)
		recipe = Recipe.objects.get(id=res.data['id'])
		for key in payload.keys():
			self.assertEqual(payload[key], getattr(recipe, key))

	def test_create_recipe_with_tags(self):
		#test creating a recipe with tags
		tag1 = sample_tag(user=self.user, name='Main Course')
		tag2 = sample_tag(user=self.user, name= 'Beef')
		payload = {
			'title':'Beef Stew',
			'tags':[tag1.id,tag2.id],
			'time': 60,
			'price':15
		}
		res = self.client.post(RECIPES_URL, payload)
		recipe= Recipe.objects.get(id=res.data['id'])
		tags = recipe.tags.all()
		
		self.assertEqual(tags.count(),2)
		self.assertIn(tag2, tags)
		self.assertIn(tag1, tags)

	def test_create_recipe_with_ingredients(self):
		#Test creating recipe with ingredients
		ingredient1 = sample_ingredient(user=self.user, name="Beef")
		ingredient2 = sample_ingredient(user=self.user,name='Soy Sauce')
		payload = {
			'title':'Beef Stew',
			'ingredients':[ingredient1.id, ingredient2.id],
			'time':30,
			'price':15
		}
		res = self.client.post(RECIPES_URL, payload)

		self.assertEqual(res.status_code, status.HTTP_201_CREATED)
		recipe = Recipe.objects.get(id=res.data['id'])
		ingredients = recipe.ingredients.all()

		self.assertEqual(ingredients.count(),2)
		self.assertIn(ingredient1, ingredients)
		self.assertIn(ingredient2, ingredients)

	def test_partial_update_recipe(self):
		#Update recipe with a patch
		recipe = sample_recipe(user=self.user)
		recipe.tags.add(sample_tag(user=self.user))
		new_tag = sample_tag(user=self.user,name="Curry")

		payload = {'title':'Chicken Curry', 'tags': [new_tag.id]}
		url = detail_url(recipe.id)
		self.client.patch(url, payload)

		recipe.refresh_from_db()
		self.assertEqual(recipe.title, payload['title'])
		tags = recipe.tags.all()
		self.assertEqual(len(tags), 1)
		self.assertIn(new_tag, tags)

	def test_full_update_recipe(self):
		#update recipe with a PUT
		recipe= sample_recipe(user=self.user)
		recipe.tags.add(sample_tag(user=self.user))
		payload = {
			'title':'Spaghetti',
			'time': 25,
			'price':10.00,
		}
		url= detail_url(recipe.id)
		self.client.put(url,payload)

		recipe.refresh_from_db()
		self.assertEqual(recipe.title, payload['title'])
		self.assertEqual(recipe.time, payload['time'])
		tags = recipe.tags.all()
		self.assertEqual(len(tags),0)

	