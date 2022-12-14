import React from 'react';
import { Redirect } from 'react-router-dom';

const StandAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/stand_management/:id',
			component: React.lazy(() => import('./StandApp'))
		},
	]
};

export default StandAppConfig;
