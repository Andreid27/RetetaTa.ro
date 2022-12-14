import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import * as apiSpec from '../../../../apiSpec';

export const getTotalUsers = createAsyncThunk('totalUsers/getTotalUsers', async id => {
	const response = await axios.get(apiSpec.USER);
	const data = await response.data;

	return data;
});

const totalUsersAdapter = createEntityAdapter({});

const totalUsersSlice = createSlice({
	name: 'totalUsers',
	initialState: totalUsersAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getTotalUsers.fulfilled]: (state, action) => action.payload
	}
});

export default totalUsersSlice.reducer;
