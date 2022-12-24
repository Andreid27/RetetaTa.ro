import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import * as apiSpec from './../../../../apiSpec';

export const getProduct = createAsyncThunk('eCommerceApp/product/getProduct', async params => {
	const response = await axios.get('/api/e-commerce-app/product', { params });
	const data = await response.data;

	return data;
});

export const saveProduct = createAsyncThunk('eCommerceApp/product/saveProduct', async product => {
	const response = await axios.post('/reteta', product);
	const data = await response.data;

	return data;
});

const productSlice = createSlice({
	name: 'eCommerceApp/product',
	initialState: null,
	reducers: {
		newProduct: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					// id: FuseUtils.generateGUID(), // fie daca există deja este adăugat, fie este blank
					denumire: '',
					descriere: '',
					priceRange:1,
					calorii:0,
					ingredientCantitate: []
				}
			})
		}
	},
	extraReducers: {
		[getProduct.fulfilled]: (state, action) => action.payload,
		[saveProduct.fulfilled]: (state, action) => action.payload
	}
});

export const { newProduct } = productSlice.actions;

export default productSlice.reducer;
