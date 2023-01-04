import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as apiSpec from '../../../../apiSpec';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import './StatusUpdate/custom-toastr.css';

export const getIngredient = createAsyncThunk('ingredienteApp/ingredient/getIngredient', async params => {
	const response = await axios.get(apiSpec.INGREDIENT + '/' + params.ingredientId);
	const data = await response.data;

	return data;
});

export const saveIngredient = createAsyncThunk('ingredienteApp/ingredient/saveIngredient', async ingredient => {

	const response = await axios.post(apiSpec.INGREDIENT, ingredient);

	const data = await response.data;
	const status = await response.status;
	if (status === 200) {
		toastr.success('Ingredientul a fost adăugat cu succes!');
	}

	return data;
});




export const updateIngredient = createAsyncThunk('ingredienteApp/ingredient/updateIngredient', async ingredient => {
	const response = await axios.post(apiSpec.INGREDIENT, ingredient);

	const data = await response.data;
	const status = await response.status;
	if (status === 200) {
		toastr.success('Ingredientul a fost modificat cu succes!');
	}

	return data;
});

export const deleteIngredient = createAsyncThunk('ingredienteApp/ingredient/deleteIngredient', async params => {
	const response = await axios.delete(apiSpec.INGREDIENT + '/' + params.ingredientId);
	const data = await response.data;
	const status = await response.status;
	if (status === 200) {
		toastr.success('Ingredientul a fost ștears cu succes!');
	}

	return data;
});

const ingredientSlice = createSlice({
	name: 'ingredienteApp/ingredient',
	initialState: null,
	reducers: {
		newIngredient: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					denumire: '',
					descriere: '',
				}
			})
		}
	},
	extraReducers: {
		[getIngredient.fulfilled]: (state, action) => action.payload,
		[saveIngredient.fulfilled]: (state, action) => action.payload
	}
});

export const { newIngredient } = ingredientSlice.actions;

export default ingredientSlice.reducer;
