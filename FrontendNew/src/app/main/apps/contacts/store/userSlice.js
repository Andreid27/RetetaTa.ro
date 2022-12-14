import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as apiSpec from '../../../../apiSpec';

export const getUserData = createAsyncThunk('contactsApp/user/getUserData', async () => {
	const response = await axios.get(apiSpec.PROFILE);
	const data = await response.data;
	return data;
});

const userSlice = createSlice({
	name: 'contactsApp/user',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getUserData.fulfilled]: (state, action) => action.payload
	}
});

export default userSlice.reducer;
