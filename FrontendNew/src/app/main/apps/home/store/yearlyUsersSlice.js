import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import * as apiSpec from '../../../../apiSpec';

export const getYearlyUsers = createAsyncThunk('yearlyUsers/getWeeklyUsers', async id => {
	const response = await axios.get(apiSpec.YEARLY_USERS);
	const data = await response.data;

	return data;
});

const yearlyUsersAdapter = createEntityAdapter({});

const yearlyUsersSlice = createSlice({
	name: 'yearlyUsers',
	initialState: yearlyUsersAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getYearlyUsers.fulfilled]: (state, action) => action.payload
	}
});

export default yearlyUsersSlice.reducer;
