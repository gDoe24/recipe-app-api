import { GET_RECIPES, DELETE_RECIPE, ADD_RECIPE, GET_INGREDIENTS } from '../actions/types.js';

const initialState = {
	recipes: ['Kobe'],
	ingredients:['JellyBean']
}

export default function(state=initialState, action){
	switch(action.type){
		case GET_RECIPES:
			return {
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
				ingredients: action.payload
			}
	}
}