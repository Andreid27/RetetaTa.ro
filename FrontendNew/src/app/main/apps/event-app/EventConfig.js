import React from 'react';
import { Redirect } from 'react-router-dom';

const EventConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/event-app/:id',
			component: React.lazy(() => import('./EventApp'))
		},
		{
			path: '/apps/event-app',
			component: () => <Redirect to="/apps/event-app/all" />
		}
	]
};

export default EventConfig;
