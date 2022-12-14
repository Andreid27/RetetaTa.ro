import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import * as apiSpec from '../../../../apiSpec';

export const getEventById = createAsyncThunk('eventUnity/getEventById', async id => {
	const response = await axios.get(`${apiSpec.GET_ALL_EVENTS}/${id}`);
	return response.data;
});

const eventAdapter = createEntityAdapter({});

const eventUnitySlice = createSlice({
	name: 'eventUnity',
	initialState: eventAdapter.getInitialState({
		event: null
	}),
	reducers: {},
	extraReducers: {
		[getEventById.fulfilled]: (state, action) => action.payload
	}
});

export default eventUnitySlice.reducer;
