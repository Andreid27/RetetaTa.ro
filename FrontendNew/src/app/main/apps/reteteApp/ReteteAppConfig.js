import React from 'react';
import { Redirect } from 'react-router-dom';

const ReteteAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/reteteApp/retete/:productId/:productHandle?',
			component: React.lazy(() => import('./reteta/Reteta'))
		},
		{
			path: '/apps/reteteApp/retete',
			component: React.lazy(() => import('./retete/Retete'))
		},
		{
			path: '/apps/reteteApp',
			component: () => <Redirect to="/apps/reteteApp/Retete" />
		}
	]
};

export default ReteteAppConfig;
