from rest_framework import serializers
from core.models import Tag, Ingredient, Recipe


class TagSerializer(serializers.ModelSerializer):

	class Meta:
		model = Tag
		fields = ('id', 'name')
		read_only_fields = ('id',)

class IngredientSerializer(serializers.ModelSerializer):
		#Serializer for ingredients
	class Meta:
		model = Ingredient
		fields = ('id', 'name','unit','amount')
		read_only_fields = ('id',)


class RecipeSerializer(serializers.ModelSerializer):
	#Serializer for Recipe
	ingredients = serializers.PrimaryKeyRelatedField(
		many=True,
		queryset=Ingredient.objects.all()
	)
	tags = serializers.PrimaryKeyRelatedField(
		many=True,
		queryset=Tag.objects.all()
	)

	class Meta:
		model = Recipe
		fields = ('user','id','title','time','price','ingredients',
				  'tags','description','methods','image')
		read_only_fields = ('id',)


class RecipeDetailSerializer(RecipeSerializer):
	#Seralize the detail for recipe
	ingredients = IngredientSerializer(many=True, read_only=True)
	tags = TagSerializer(many=True, read_only=True)


class RecipeImageSerializer(serializers.ModelSerializer):
	#Image serializer for recipes

	class Meta:
		model = Recipe
		fields = ('id','image')
		read_only_fields = ('id',)