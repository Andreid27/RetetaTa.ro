import React from 'react';
import { Redirect } from 'react-router-dom';

const HomeAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/home',
			component: React.lazy(() => import('./Home'))
		}
	]
};

export default HomeAppConfig;
