import axios from 'axios';

import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL,
 LOGOUT_SUCCESS, CREATE_USER_SUCCESS, CREATE_USER_FAIL } from './types';

//Check Token and Load User

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

export const loadUser = () => (dispatch, getState) =>{
	//User Loading
	dispatch({ type: USER_LOADING });

	//Get Token from state

	

	axios.get('/api/user/me', tokenConfig(getState))
		.then(res =>{
			dispatch({
				type: USER_LOADED,
				payload: res.data
			});
		}).catch(err=>{
			dispatch({
				type:AUTH_ERROR
			});
		});
}

export const login = (email, password) => (dispatch,getState) =>{
	
	//Headers
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	//Request username and password to JSON
	const body = JSON.stringify({ email, password });
	//If token, add to headers config

	axios.post('/api/user/token/', body, config)
		.then(res =>{
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			});
		}).catch(err=>{
			dispatch({
				type:LOGIN_FAIL
			});
		});

	setTimeout(()=>{
		axios.get('/api/user/me', tokenConfig(getState))
		.then(res =>{
			dispatch({
				type: USER_LOADED,
				payload: res.data
			});
		}).catch(err=>{
			dispatch({
				type:AUTH_ERROR
			});
		});
	},500)
}

//Create New User
export const createUser = ({ email,password,name }) => dispatch =>{
	
	//Headers
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	//Request username and password to JSON
	const body = JSON.stringify({ email, password, name });
	//If token, add to headers config

	
	axios.post('/api/user/create/',body, config)
		.then(res =>{
			dispatch({
				type: CREATE_USER_SUCCESS,
				payload: res.data
			});
		}).catch(err=>{
			dispatch({
				type:CREATE_USER_FAIL
			});
		});

	setTimeout(()=>{
		axios.get('/api/user/me', tokenConfig(getState))
		.then(res =>{
			dispatch({
				type: USER_LOADED,
				payload: res.data
			});
		}).catch(err=>{
			dispatch({
				type:AUTH_ERROR
			});
		});
	},500)
}

//Logout

export const logout = () => (dispatch, getState, Authorization) =>{
	//Get Token from state

	
	axios.post('/api/user/logout/', null, tokenConfig(getState))
		.then(res =>{
			dispatch({
				type: LOGOUT_SUCCESS,
			});
		}).catch(err=>{
			dispatch({
				type:AUTH_ERROR
			});
		});
}


//Setup header config with token

export const tokenConfig = getState => {
		const token = getState().auth.token;

	//Headers
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	//If token, add to headers config

	if(token){
		config.headers['Authorization'] = `Token ${token}`;
	}
	return config
}