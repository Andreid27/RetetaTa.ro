import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import * as apiSpec from '../../../../apiSpec';

export const getDailyUsers = createAsyncThunk('dailyUsers/getDailyUsers', async period => {
	const response = await axios.get(`${apiSpec.USER}/${period}`);
	const data = await response.data;

	return data;
});

const dailyUsersAdapter = createEntityAdapter({});

const dailyUsersSlice = createSlice({
	name: 'dailyUsers',
	initialState: dailyUsersAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getDailyUsers.fulfilled]: (state, action) => action.payload
	}
});

export default dailyUsersSlice.reducer;
