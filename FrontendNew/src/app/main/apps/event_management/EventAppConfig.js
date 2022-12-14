import React from 'react';
import { Redirect } from 'react-router-dom';

const EventAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/event_management/:id',
			component: React.lazy(() => import('./EventApp'))
		},
		{
			path: 'event_management/apps/',
			component: () => <Redirect to="/apps/event_management/all" />
		}
	]
};

export default EventAppConfig;
