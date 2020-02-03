import { GET_RECIPES, DELETE_RECIPE, ADD_RECIPE } from '../actions/types.js';

const initialState = {
	recipes: ['Kobe']
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
	}
}