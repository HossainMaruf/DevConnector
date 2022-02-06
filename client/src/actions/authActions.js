import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {GET_ERRORS, SET_CURRENT_USER} from './types';

// register user
export const registerUser = (userData, history) => dispatch => {
	axios.post('/api/users/register', userData)
		.then(user => {
			// console.log(user);
			// console.log(history);
			history('/login');
		})
		.catch(error => {
			dispatch({
				type: GET_ERRORS,
				payload: error.response.data
			});
		})
}


// login user -> get the token
export const loginUser = (userData, history) => dispatch => {
	axios.post('/api/users/login', userData)
		.then(res => {
			// get token for success
			const {token} = res.data;
			// save the token
			localStorage.setItem('jwtToken', token);
			// set auth token
			setAuthToken(token);
			// decode token to get the user data
			const decoded = jwt_decode(token);
			// set the user
			dispatch(setCurrentUser(decoded));
			// redirect to dashboard
			// history('/dashboard');
		})
		.catch(error => {
			dispatch({
				type: GET_ERRORS,
				payload: error.response.data
			})
		})
}


// set logged in user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
}

// logout the user
export const logoutUser = () => dispatch => {
	// remove the token from the local storage
	localStorage.removeItem('jwtToken');
	// remove the auth header for future request
	setAuthToken(false);
	// set current user to {} and isAuthenticated to false
	dispatch(setCurrentUser({}));
}