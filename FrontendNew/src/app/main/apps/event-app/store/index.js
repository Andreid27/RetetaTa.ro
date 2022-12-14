import { combineReducers } from '@reduxjs/toolkit';
import event from './eventSlice';

const reducer = combineReducers({
	event
});

export default reducer;
