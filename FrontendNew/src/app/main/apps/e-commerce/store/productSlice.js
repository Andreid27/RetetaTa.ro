import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import * as apiSpec from './../../../../apiSpec';
import { useSelector } from 'react-redux';

export const getProduct = createAsyncThunk('eCommerceApp/product/getProduct', async params => {
	console.log(params)
	const response = await axios.get(apiSpec.RETETA +'/'+ params.productId);
	const data = await response.data;

	return data;
});

export const saveProduct = createAsyncThunk('eCommerceApp/product/saveProduct', async product => {
	let ingredientCantitateFormat = []
	for(let i=0;i<product.ingredientCantitate.length;i++){
		let ingredient = {
			ingredient:{
				id: product.ingredientCantitate[i][0]
			},
			cantitate: product.ingredientCantitate[i][1]
		}
		ingredientCantitateFormat.push(ingredient);
	}

	const response = await axios.post(apiSpec.RETETA,{ 
	denumire: product.denumire,
    descriere: product.descriere,
	priceRange: product.priceRange,
	ingredientCantitate: ingredientCantitateFormat
})

	const data = await response.data;

	return data;
});


export const deleteReteta = createAsyncThunk('eCommerceApp/product/deleteReteta', async params => {
	console.log(params)
	const response = await axios.delete(apiSpec.RETETA +'/'+ params.productId);
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
					ingredientCantitate: [],
					ingredienteNumber:1
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
