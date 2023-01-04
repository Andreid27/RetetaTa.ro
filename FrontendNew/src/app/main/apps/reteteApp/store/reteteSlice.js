import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getretete = createAsyncThunk('reteteApp/Retete/getRetete', async () => {
	const response = await axios.get('/retete');
	const data = await response.data;

	return data;
});

const reteteAdapter = createEntityAdapter({});

export const { selectAll: selectretete, selectById: selectProductById } = reteteAdapter.getSelectors(
	state => state.reteteApp.retete
);

const reteteSlice = createSlice({
	name: 'reteteApp/retete',
	initialState: reteteAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setreteteSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getretete.fulfilled]: reteteAdapter.setAll
	}
});

export const { setreteteSearchText } = reteteSlice.actions;

export default reteteSlice.reducer;
