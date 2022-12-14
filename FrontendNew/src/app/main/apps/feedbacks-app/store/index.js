import { combineReducers } from '@reduxjs/toolkit';
import labels from './labelsSlice';
import feedbacks from './feedbackSlice';

const reducer = combineReducers({
	feedbacks,
	labels
});

export default reducer;
