import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk('eCommerceApp/Retete/getRetete', async () => {
	const response = await axios.get('/retete');
	const data = await response.data;

	return data;
});

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } = productsAdapter.getSelectors(
	state => state.eCommerceApp.products
);

const productsSlice = createSlice({
	name: 'eCommerceApp/products',
	initialState: productsAdapter.getInitialState({
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
		[getProducts.fulfilled]: productsAdapter.setAll
	}
});

export const { setProductsSearchText } = productsSlice.actions;

export default productsSlice.reducer;
