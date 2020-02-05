 import axios from 'axios';

 import { GET_RECIPES, DELETE_RECIPE, ADD_RECIPE, GET_INGREDIENTS } from './types';

//action method
 export const getRecipes = () => (dispatch) =>{
	axios.get('/api/recipe/recipes')
		.then(res => {
			dispatch({
				type: GET_RECIPES,
				payload: res.data
			});
		}).catch(err => console.log(err));
 };
//Delete Recipe
 export const deleteRecipe = (id) => dispatch =>{
	axios.delete(`/api/recipe/recipes/${id}`)
		.then(res => {
			dispatch({
				type: DELETE_RECIPE,
				payload: id
			});
		}).catch(err => console.log(err));
 };

 //Add Recipe

  export const addRecipe = (recipe) => dispatch =>{
	axios.post('/api/recipe/recipes', recipe)
		.then(res => {
			dispatch({
				type: ADD_RECIPE,
				payload: res.data
			});
		}).catch(err => console.log(err));
 };
 
//Get Ingredients
 export const getIngredients = () => (dispatch) =>{
	axios.get('/api/recipe/ingredients')
		.then(res => {
			dispatch({
				type: GET_INGREDIENTS,
				payload: res.data
			});
		}).catch(err => console.log(err));
 };