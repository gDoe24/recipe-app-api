import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS,
 LOGIN_FAIL, LOGOUT_SUCCESS, CREATE_USER_SUCCESS, CREATE_USER_FAIL } from '../actions/types';

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null
};

export default function(state = initialState, action){
	switch(action.type){
		case USER_LOADING:
			return {
				...state,
				isLoading:true,
			}
		case USER_LOADED:
			return{
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload,
			}
		case LOGIN_SUCCESS:
		case CREATE_USER_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return{
				...state,
				...action.payload,
				user:action.payload.token,
				isAuthenticated: true,
				isLoading: false,
			}

		case LOGIN_FAIL:
		case LOGOUT_SUCCESS:
		case CREATE_USER_FAIL:
		case AUTH_ERROR:
				localStorage.removeItem('token');
				return {
				...state,
				recipes:[],
				token: null,
				user:null,
				isAuthenticated: null,
				isLoading: false,
			}


		default:
			return state;
	}
}