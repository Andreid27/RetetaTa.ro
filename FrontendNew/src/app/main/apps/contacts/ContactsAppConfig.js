import React from 'react';
import { Redirect } from 'react-router-dom';

const ContactsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/contacts/all',
			component: React.lazy(() => import('./ContactsApp'))
		}
	]
};

export default ContactsAppConfig;
