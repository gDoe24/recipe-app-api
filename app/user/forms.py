from django import forms
from core.models import Ingredient

class AddIngredientForm(forms.ModelForm):
	
	class Meta:
		model = Ingredient
		fields = ('name','amount','unit')