import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import * as apiSpec from '../../../../apiSpec';

export const getStandsByEventId = createAsyncThunk('standApp/getStandsByEventId', async (id) => {
	const response = await axios.get(apiSpec.GET_ALL_EVENTS + `/${id}/stands`);
	const data = await response.data;

	return { data };
});

export const addStand = createAsyncThunk(
	'standApp/addStand',
	async ({ eventId, stand }, { dispatch, getState }) => {

		const AccountType = getAccountType(stand);
		const formSubmit = {
			name: stand.name,
			banner: stand.banner,
			type: stand.type,
			ownerUsername: stand.ownerUsername,
			presentationLink: stand.presentationLink,
			mediaLink: stand.mediaLink,
			//isStandard: stand.isStandard,
			//isPremium: stand.isPremium,
			//isGolden: stand.isGolden,
			type: AccountType,
			premiumPresentationLink: stand.premiumPresentationLink,
			premiumMediaLink: stand.premiumMediaLink,
			goldenPresentationLink: stand.goldenPresentationLink,
			goldenMediaLink: stand.goldenMediaLink
		};

		const response = await axios.post(apiSpec.GET_ALL_EVENTS + `/${eventId}/stands`, formSubmit);
		const data = await response.data;

		dispatch(getStandsByEventId(eventId));

		return data;
	}
);

function getAccountType(stand) {
	var AccountType = '';
	if (stand.isStandard == true) {
		AccountType = 'standard';
	}
	else if (stand.isPremium == true) {
		AccountType = 'premium';
	}
	else if (stand.isGolden == true) {
		AccountType = 'golden';
	}
	console.log(AccountType);
	return AccountType;
}; // -> de revenit aici 


export const updateStand = createAsyncThunk(
	'standApp/updateStand',
	async ({ eventId, stand }, { dispatch, getState }) => {
		const formSubmit = {
			name: stand.name,
			banner: stand.banner,
			type: stand.type,
			ownerUsername: stand.ownerUsername,
			presentationLink: stand.presentationLink,
			mediaLink: stand.mediaLink,
			isStandard: stand.isStandard,
			isPremium: stand.isPremium,
			isGolden: stand.isGolden,
			premiumPresentationLink: stand.premiumPresentationLink,
			premiumMediaLink: stand.premiumMediaLink,
			goldenPresentationLink: stand.goldenPresentationLink,
			goldenMediaLink: stand.goldenMediaLink
		};

		const response = await axios.put(apiSpec.GET_ALL_EVENTS + `/${eventId}/stands/${stand.id}`, formSubmit);
		const data = await response.data;

		dispatch(getStandsByEventId(eventId));

		return data;
	}
);

export const toggleStarredStand = createAsyncThunk(
	'standApp/toggleStarredStand',
	async (ev_id, standId, { dispatch, getState }) => {
		const response = await axios.post('/api/events-app/toggle-starred-stand', { standId });
		const data = await response.data;

		dispatch(getStandsByEventId(ev_id));

		return data;
	}
);

export const toggleStarredStands = createAsyncThunk(
	'standApp/toggleStarredStands',
	async (ev_id, standIds, { dispatch, getState }) => {
		const response = await axios.post('/api/events-app/toggle-starred-stands', { standIds });
		const data = await response.data;

		dispatch(getStandsByEventId(ev_id));

		return data;
	}
);

export const setStandsStarred = createAsyncThunk(
	'standApp/setStandsStarred',
	async (ev_id, standIds, { dispatch, getState }) => {
		const response = await axios.post('/api/events-app/set-stands-starred', { standIds });
		const data = await response.data;

		dispatch(getStandsByEventId(ev_id));

		return data;
	}
);

export const setStandsUnstarred = createAsyncThunk(
	'standApp/setStandsUnstarred',
	async (ev_id, standIds, { dispatch, getState }) => {
		const response = await axios.post('/api/events-app/set-stands-unstarred', { standIds });
		const data = await response.data;

		dispatch(getStandsByEventId(ev_id));

		return data;
	}
);

const standsAdapter = createEntityAdapter({
	selectId: element => element.id
});

export const { selectAll: selectStands } = standsAdapter.getSelectors(
	state => state.standApp.stands
);

const standSlice = createSlice({
	name: 'standApp',
	initialState: standsAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		standDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setStandsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: stand => ({ payload: stand.target.value || '' })
		},
		openNewStandDialog: (state, action) => {
			state.standDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeNewStandDialog: (state, action) => {
			state.standDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditStandDialog: (state, action) => {
			state.standDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditStandDialog: (state, action) => {
			state.standDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		[updateStand.fulfilled]: standsAdapter.upsertOne,
		[addStand.fulfilled]: standsAdapter.addOne,
		[getStandsByEventId.fulfilled]: (state, action) => {
			const { data } = action.payload;
			standsAdapter.setAll(state, data);
		}
	}
});

export const {
	setStandsSearchText,
	openNewStandDialog,
	closeNewStandDialog,
	openEditStandDialog,
	closeEditStandDialog
} = standSlice.actions;

export default standSlice.reducer;
