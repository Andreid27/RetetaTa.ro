import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import * as apiSpec from '../../../../apiSpec';

export const getEvents = createAsyncThunk('eventApp/event_management/getEvents', async () => {
	const response = await axios.get(apiSpec.GET_ALL_EVENTS);
	const data = await response.data;

	return { data };
});

export const addEvent = createAsyncThunk(
	'eventApp/event_management/addEvent',
	async (event, { dispatch, getState }) => {
		const formSubmit = {
			name: event.name,
			startDate: event.startDate,
			endDate: event.endDate,
			description: event.description,
			username: event.owner,
			numberOfStands: event.numberOfStands
		};

		const response = await axios.post(apiSpec.GET_ALL_EVENTS, formSubmit);
		const data = await response.data;

		dispatch(getEvents());

		return data;
	}
);

export const updateEvent = createAsyncThunk(
	'eventApp/event_management/updateEvent',
	async (event, { dispatch, getState }) => {
		const formSubmit = {
			name: event.name,
			startDate: event.startDate,
			endDate: event.endDate,
			description: event.description,
			username: event.owner,
			numberOfStands: event.numberOfStands
		};

		const response = await axios.put(apiSpec.GET_ALL_EVENTS + `/${event.id}`, formSubmit);
		const data = await response.data;

		dispatch(getEvents());

		return data;
	}
);

export const removeEvent = createAsyncThunk(
	'eventApp/event_management/removeEvent',
	async (eventId, { dispatch, getState }) => {
		const response = await axios.post('/api/events-app/remove-event', { eventId });
		const data = await response.data;
		dispatch(getEvents());

		return data;
	}
);

export const removeEvents = createAsyncThunk(
	'eventApp/event_management/removeEvents',
	async (eventIds, { dispatch, getState }) => {
		const response = await axios.post('/api/events-app/remove-events', { eventIds });
		const data = await response.data;

		dispatch(getEvents());

		return data;
	}
);

export const toggleStarredEvent = createAsyncThunk(
	'eventApp/event_management/toggleStarredEvent',
	async (eventId, { dispatch, getState }) => {
		const response = await axios.post('/api/events-app/toggle-starred-event', { eventId });
		const data = await response.data;

		dispatch(getEvents());

		return data;
	}
);

export const toggleStarredEvents = createAsyncThunk(
	'eventApp/event_management/toggleStarredEvents',
	async (eventIds, { dispatch, getState }) => {
		const response = await axios.post('/api/events-app/toggle-starred-events', { eventIds });
		const data = await response.data;

		dispatch(getEvents());

		return data;
	}
);

export const setEventsStarred = createAsyncThunk(
	'eventApp/event_management/setEventsStarred',
	async (eventIds, { dispatch, getState }) => {
		const response = await axios.post('/api/events-app/set-events-starred', { eventIds });
		const data = await response.data;

		dispatch(getEvents());

		return data;
	}
);

export const setEventsUnstarred = createAsyncThunk(
	'eventApp/event_management/setEventsUnstarred',
	async (eventIds, { dispatch, getState }) => {
		const response = await axios.post('/api/events-app/set-events-unstarred', { eventIds });
		const data = await response.data;

		dispatch(getEvents());

		return data;
	}
);

const eventsAdapter = createEntityAdapter({
	selectId: element => element.id
});

export const { selectAll: selectEvents, selectById: selectEventsById } = eventsAdapter.getSelectors(
	state => state.eventApp.events
);

const eventSlice = createSlice({
	name: 'eventApp/event_management',
	initialState: eventsAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		eventDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setEventsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openNewEventDialog: (state, action) => {
			state.eventDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewEventDialog: (state, action) => {
			state.eventDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditEventDialog: (state, action) => {
			state.eventDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditEventDialog: (state, action) => {
			state.eventDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		[updateEvent.fulfilled]: eventsAdapter.upsertOne,
		[addEvent.fulfilled]: eventsAdapter.addOne,
		[getEvents.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			eventsAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setEventsSearchText,
	openNewEventDialog,
	closeNewEventDialog,
	openEditEventDialog,
	closeEditEventDialog
} = eventSlice.actions;

export default eventSlice.reducer;
