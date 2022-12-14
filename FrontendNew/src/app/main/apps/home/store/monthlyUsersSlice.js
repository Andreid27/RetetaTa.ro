import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import * as apiSpec from '../../../../apiSpec';

export const getMonthlyUsers = createAsyncThunk('monthlyUsers/getWeeklyUsers', async id => {
	const response = await axios.get(apiSpec.MONTHLY_USERS);
	const data = await response.data;

	return data;
});

const monthlyUsersAdapter = createEntityAdapter({});

const monthlyUsersSlice = createSlice({
	name: 'monthlyUsers',
	initialState: monthlyUsersAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getMonthlyUsers.fulfilled]: (state, action) => action.payload
	}
});

export default monthlyUsersSlice.reducer;
