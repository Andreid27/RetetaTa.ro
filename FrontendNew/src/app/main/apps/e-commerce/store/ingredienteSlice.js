import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import * as apiSpec from './../../../../apiSpec';

export const getIngrediente = createAsyncThunk('eCommerceApp/Retete/getIngrediente', async () => {
	const response = await axios.get(apiSpec.INGREDIENTE);
	const data = await response.data;

	return data;
});

const ingredienteAdapter = createEntityAdapter({});

export const { selectAll: selectIngrediente, selectById: selectIngredienttById } = ingredienteAdapter.getSelectors(
	state => state.eCommerceApp.ingrediente
);

const ingredienteSlice = createSlice({
	name: 'eCommerceApp/ingrediente',
	initialState: ingredienteAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setProductsSearchText: {
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

export const { setProductsSearchText } = ingredienteSlice.actions;

export default ingredienteSlice.reducer;
