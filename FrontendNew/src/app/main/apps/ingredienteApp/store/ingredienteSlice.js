import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import * as apiSpec from '../../../../apiSpec';

export const getIngrediente = createAsyncThunk('ingredienteApp/Ingrediente/getIngrediente', async () => {
	const response = await axios.get(apiSpec.INGREDIENTE);
	const data = await response.data;

	return data;
});

const ingredienteAdapter = createEntityAdapter({});

export const { selectAll: selectIngrediente, selectById: selectProductById } = ingredienteAdapter.getSelectors(
	state => state.ingredienteApp.ingrediente
);

const ingredienteSlice = createSlice({
	name: 'reteteApp/ingrediente',
	initialState: ingredienteAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setreteteSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getIngrediente.fulfilled]: ingredienteAdapter.setAll
	}
});

export const { setreteteSearchText } = ingredienteSlice.actions;

export default ingredienteSlice.reducer;
