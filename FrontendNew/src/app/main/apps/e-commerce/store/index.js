import { combineReducers } from '@reduxjs/toolkit';
import order from './orderSlice';
import orders from './ordersSlice';
import product from './productSlice';
import products from './productsSlice';
import ingrediente from './ingredienteSlice';

const reducer = combineReducers({
	products,
	product,
	orders,
	order,
	ingrediente
});

export default reducer;
