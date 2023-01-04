import { createSlice } from '@reduxjs/toolkit';
import jwtService from 'app/services/jwtService';
import {  setUserData } from './userSlice';

export const submitRegister = ({ nume, prenume, username, mail, phoneNumber, password, confirmedPassword }) => async dispatch => {
	return jwtService
		.createUser({
			nume,
			prenume,
			username,
			mail,
			phoneNumber,
			password,
			"enabled": true
		})
		.then(user => {
			dispatch(setUserData(user));
			return dispatch(registerSuccess());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};


const initialState = {
	success: false,
	error: {
		username: null,
		password: null
	}
};

const registerSlice = createSlice({
	name: 'auth/register',
	initialState,
	reducers: {
		registerSuccess: (state, action) => {
			state.success = true;
		},
		registerError: (state, action) => {
			state.success = false;
			state.error = action.payload;
		}
	},
	extraReducers: {}
});

export const { registerSuccess, registerError } = registerSlice.actions;

export default registerSlice.reducer;
