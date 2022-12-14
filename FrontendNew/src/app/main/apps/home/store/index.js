import { combineReducers } from '@reduxjs/toolkit';
import events from './homeSlice';
import daily from './dailyUsersSlice';
import weekly from './weeklyUsersSlice';
import monthly from './monthlyUsersSlice';
import yearly from './yearlyUsersSlice';
import total from './totalUserSlice';

const reducer = combineReducers({
	events,
	daily,
	weekly,
	monthly,
	yearly,
	total
});

export default reducer;
