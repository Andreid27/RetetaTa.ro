import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import * as apiSpec from '../../../../apiSpec';

export const getWeeklyUsers = createAsyncThunk('weeklyUsers/getWeeklyUsers', async id => {
	const response = await axios.get(apiSpec.WEEKLY_USERS);
	const data = await response.data;

	return data;
});

const weeklyUsersAdapter = createEntityAdapter({});

const weeklyUsersSlice = createSlice({
	name: 'weeklyUsers',
	initialState: weeklyUsersAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getWeeklyUsers.fulfilled]: (state, action) => action.payload
	}
});

export default weeklyUsersSlice.reducer;
