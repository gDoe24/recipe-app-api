import { GET_RECIPES, DELETE_RECIPE, ADD_RECIPE, GET_INGREDIENTS, ADD_INGREDIENT } from '../actions/types.js';

const initialState = {
	recipes: ['Kobe'],
	ingredients:['JellyBean']
}

export default function(state=initialState, action){
	switch(action.type){
		case GET_RECIPES:
			return {
				...state,
				recipes: action.payload
			}
			
		case DELETE_RECIPE:
			return {
				...state,
				recipes: state.recipes.filter(recipes => recipes.id !== action.payload)
			}
		case ADD_RECIPE:
			return {
				...state,
				recipes: [...state.recipes,action.payload]
			}
		default:
			return state;
		case GET_INGREDIENTS:
			return {
				...state,
				ingredients: action.payload
			}
		case ADD_INGREDIENT:
			return {
				...state,
				ingredients: [...state.ingredients, action.payload]
			}
	}
}