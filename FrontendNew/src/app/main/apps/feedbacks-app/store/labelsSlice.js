import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import * as apiSpec from '../../../../apiSpec';


export const getLabels = createAsyncThunk('feedbackApp/labels/getLabels', async (id) => {
	const response = await axios.get(apiSpec.GET_ALL_EVENTS + `/${id}/stands`);
	const data = await response.data;

	return data;
});


export const updateLabels = createAsyncThunk('feedbackApp/labels/updateLabels', async labels => {
	const response = await axios.post('/api/notes-app/update-labels', { labels: Object.values(labels) });
	const data = await response.data;

	return data;
});

const labelsAdapter = createEntityAdapter({});

export const {
	selectAll: selectLabels,
	selectEntities: selectLabelsEntities,
	selectById: selectLabelById
} = labelsAdapter.getSelectors(state => state.feedbackApp.labels);

const labelsSlice = createSlice({
	name: 'feedbackApp/labels',
	initialState: labelsAdapter.getInitialState({ labelsDialogOpen: false }),
	reducers: {
		openLabelsDialog: (state, action) => {
			state.labelsDialogOpen = true;
		},
		closeLabelsDialog: (state, action) => {
			state.labelsDialogOpen = false;
		}
	},
	extraReducers: {
		[getLabels.fulfilled]: labelsAdapter.setAll,
		[updateLabels.fulfilled]: labelsAdapter.setAll
	}
});

export const { openLabelsDialog, closeLabelsDialog } = labelsSlice.actions;

export default labelsSlice.reducer;
