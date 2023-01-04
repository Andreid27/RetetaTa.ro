import { combineReducers } from '@reduxjs/toolkit';
import ingredient from './ingredientSlice';
import retete from './ingredienteSlice';
import ingrediente from './ingredienteSlice';

const reducer = combineReducers({
	retete,
	ingredient,
	ingrediente
});

export default reducer;
