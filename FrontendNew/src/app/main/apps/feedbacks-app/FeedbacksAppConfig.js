import React from 'react';

const FeedbacksAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/feedback/:id?/:labelHandle?/:labelId?',
			exact: true,
			component: React.lazy(() => import('./FeedbacksApp'))
		}
	]
};

export default FeedbacksAppConfig;
