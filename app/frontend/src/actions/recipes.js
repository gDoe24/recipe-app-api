 import axios from 'axios';

 import { GET_RECIPES, DELETE_RECIPE, ADD_RECIPE,
  GET_INGREDIENTS, ADD_INGREDIENT, GET_TAGS } from './types';

  import { tokenConfig } from './auth';

//Get Recipes action
 export const getRecipes = () => (dispatch, getState) =>{
	axios.get('/api/recipe/recipes', tokenConfig(getState))
		.then(res => {
			dispatch({
				type: GET_RECIPES,
				payload: res.data
			});
		}).catch(err => console.log(err));
 };
//Delete Recipe
 export const deleteRecipe = (id) => (dispatch, getState) =>{
	axios.delete(`/api/recipe/recipes/${id}`, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: DELETE_RECIPE,
				payload: id
			});
		}).catch(err => console.log(err));
 };

 //Add Recipe

  export const addRecipe = (recipe) => (dispatch, getState) =>{
	axios.post('/api/recipe/recipes/', recipe, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: ADD_RECIPE,
				payload: res.data
			});
		}).catch(err => console.log(err));
 };
 
//Get Ingredients
 export const getIngredients = () => (dispatch, getState) =>{
	axios.get('/api/recipe/ingredients', tokenConfig(getState))
		.then(res => {
			dispatch({
				type: GET_INGREDIENTS,
				payload: res.data
			});
		}).catch(err => console.log(err));
 };

 export const addIngredient = (ingredient) => (dispatch, getState) =>{
	axios.post('/api/recipe/ingredients/', ingredient, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: ADD_INGREDIENT,
				payload: res.data
			});
		}).catch(err => console.log(err));
 };

  export const getTags = () => (dispatch, getState) =>{
	axios.get('/api/recipe/tags', tokenConfig(getState))
		.then(res => {
			dispatch({
				type: GET_TAGS,
				payload: res.data
			});
		}).catch(err => console.log(err));
 };
