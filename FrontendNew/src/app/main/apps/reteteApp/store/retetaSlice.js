import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as apiSpec from '../../../../apiSpec';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import './StatusUpdate/custom-toastr.css';

export const getProduct = createAsyncThunk('eCommerceApp/product/getProduct', async params => {
	// console.log(params);
	const response = await axios.get(apiSpec.RETETA + '/' + params.productId);
	const data = await response.data;

	return data;
});

export const saveProduct = createAsyncThunk('eCommerceApp/product/saveProduct', async product => {
	let ingredientCantitateFormat = [];
	for (let i = 0; i < product.ingredientCantitate.length; i++) {
		let ingredient = {
			ingredient: {
				id: product.ingredientCantitate[i][0]
			},
			cantitate: product.ingredientCantitate[i][1]
		};
		ingredientCantitateFormat.push(ingredient);
	}

	const response = await axios.post(apiSpec.RETETA, {
		denumire: product.denumire,
		descriere: product.descriere,
		priceRange: product.priceRange,
		calorii: product.calorii,
		ingredientCantitate: ingredientCantitateFormat
	});

	const data = await response.data;
	const status = await response.status;
	if (status === 200) {
		toastr.success('Rețeta a fost adăugată cu succes!');
	}

	return data;
});




export const updateProduct = createAsyncThunk('eCommerceApp/product/updateProduct', async product => {
	let ingredientCantitateFormat = [];
	for (let i = 0; i < product.ingredientCantitate.length; i++) {
		let ingredient = {
			ingredient: {
				id: product.ingredientCantitate[i][0]
			},
			cantitate: product.ingredientCantitate[i][1]
		};
		ingredientCantitateFormat.push(ingredient);
	}

	const response = await axios.put(apiSpec.RETETA, {
		id: product.id,
		denumire: product.denumire,
		descriere: product.descriere,
		priceRange: product.priceRange,
		calorii: product.calorii,
		ingredientCantitate: ingredientCantitateFormat,
	});

	const data = await response.data;
	const status = await response.status;
	if (status === 200) {
		toastr.success('Rețeta a fost modificată cu succes!');
	}

	return data;
});

export const deleteReteta = createAsyncThunk('eCommerceApp/product/deleteReteta', async params => {
	const response = await axios.delete(apiSpec.RETETA + '/' + params.productId);
	const data = await response.data;
	const status = await response.status;
	if (status === 200) {
		toastr.success('Rețeta a fost ștearsă cu succes!');
	}

	return data;
});

const retetelice = createSlice({
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
					priceRange: 1,
					calorii: 0,
					ingredientCantitate: [],
					ingredienteNumber: 1
				}
			})
		}
	},
	extraReducers: {
		[getProduct.fulfilled]: (state, action) => action.payload,
		[saveProduct.fulfilled]: (state, action) => action.payload
	}
});

export const { newProduct } = retetelice.actions;

export default retetelice.reducer;
