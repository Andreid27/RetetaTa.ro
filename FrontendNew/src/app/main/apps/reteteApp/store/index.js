import { combineReducers } from '@reduxjs/toolkit';
import product from './retetaSlice';
import retete from './reteteSlice';
import ingrediente from './ingredienteSlice';

const reducer = combineReducers({
	retete,
	product,
	ingrediente
});

export default reducer;
