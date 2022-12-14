import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import * as apiSpec from '../../../../apiSpec';

export const getEvents = createAsyncThunk('homeApp/events/getEvents', async () => {
	const response = await axios.get(apiSpec.GET_ALL_EVENTS);
	const data = await response.data;

	return data;
});

const homeAdapter = createEntityAdapter({});

export const { selectAll: selectEvents } = homeAdapter.getSelectors(state => state.homeApp.events);

const homeSlice = createSlice({
	name: 'homeApp/events',
	initialState: homeAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getEvents.fulfilled]: homeAdapter.setAll
	}
});

export default homeSlice.reducer;
