import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import * as apiSpec from 'app/apiSpec';
import { useDispatch } from 'react';
import { element } from 'prop-types';

export const getFeedbacks = createAsyncThunk('feedbackApp/feedback/getFeedbacks', async (labelId) => {
	const response = await axios.get(apiSpec.GET_STANDS_COMPANY + `/${labelId}/feedbacks`);
	const data = await response.data;

	return data;
});

export const getRecentFeedbacks = createAsyncThunk('feedbackApp/feedback/getFeedbacks', async (e_id) => {
	const response = await axios.get(apiSpec.GET_ALL_EVENTS + `/${e_id}/feedbacks`);
	const data = await response.data;
	return data;
});

export const createFeedback = createAsyncThunk('feedbackApp/feedback/createFeedback', async (review, { dispatch }) => {
	const response = await axios.post(apiSpec.GET_STANDS_COMPANY + `/${review.labelId}/feedbacks`, { comment: review.comment, issuedBy: review.issuedBy, rating: review.rating });
	const data = await response.data;

	console.log(review.labelId);

	dispatch(getFeedbacks(review.labelId));

	return data;
});

export const updateFeedback = createAsyncThunk('feedbackApp/feedback/updateFeedback', async feedback => {
	const response = await axios.post('/api/notes-app/update-note', { feedback });
	const data = await response.data;

	return data;
});

export const removeFeedback = createAsyncThunk('feedbackApp/feedback/removeFeedback', async feedbackId => {
	const response = await axios.post('/api/notes-app/remove-note', { feedbackId });
	const data = await response.data;

	return data;
});

const feedbackAdapter = createEntityAdapter({});

export const {
	selectAll: selectFeedbacks,
} = feedbackAdapter.getSelectors(state => state.feedbackApp.feedbacks);

const feedbackSlice = createSlice({
	name: 'feedbackApp/feedbacks',
	initialState: feedbackAdapter.getInitialState({}),
	reducers: {
		setFeedbacksSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		setFeedbacksFilterStars: {
			reducer: (state, action) => {
				state.filterStars = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		setFeedbacksFilterDate: {
			reducer: (state, action) => {
				state.filterDate = action.payload;
			},
			prepare: event => ({ payload: event || '' })
		},
		resetFeedbacksSearchText: (state, action) => {
			state.searchText = '';
		},
		resetFeedbacksFilterStars: (state, action) => {
			state.filterStars = '';
		},
		resetFeedbacksFilterDate: (state, action) => {
			state.filterDate = '';
		},
		toggleVariateDescSize: (state, action) => {
			state.variateDescSize = !state.variateDescSize;
		},
		openFeedbackDialog: (state, action) => {
			state.feedbackDialogId = action.payload;
		},
		closeFeedbackDialog: (state, action) => {
			state.feedbackDialogId = action.null;
		}
	},
	extraReducers: {
		[getFeedbacks.fulfilled]: (state, action) => { feedbackAdapter.setAll(state, action.payload); }, //console.log(action.payload)
		[createFeedback.fulfilled]: (state, action) => feedbackAdapter.addOne,
		[updateFeedback.fulfilled]: feedbackAdapter.upsertOne,
		[removeFeedback.fulfilled]: feedbackAdapter.removeOne
	}
});

export const {
	setFeedbacksSearchText,
	resetFeedbacksSearchText,
	setFeedbacksFilterStars,
	resetFeedbacksFilterStars,
	setFeedbacksFilterDate,
	resetFeedbacksFilterDate,
	toggleVariateDescSize,
	openFeedbackDialog,
	closeFeedbackDialog
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
