import { authRoles } from 'app/auth';
import i18next from 'i18next';
import DocumentationNavigation from '../main/documentation/DocumentationNavigation';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'home',
		title: 'Home',
		translate: 'Home',
		type: 'item',
		icon: 'account_box',
		url: '/apps/home/all'
	},
	{
		id: 'users',
		title: 'Users',
		translate: 'User Management',
		type: 'item',
		icon: 'account_box',
		url: '/apps/contacts/all'
	},
	{
		id: 'events',
		title: 'Events',
		translate: 'Event Management',
		type: 'item',
		icon: 'account_box',
		url: '/apps/event_management/all'
	},
	{
		id: 'event',
		title: 'Event',
		translate: 'DemoEvent',
		type: 'item',
		icon: 'account_box',
		url: '/apps/event-app/all'
	}
];

export default navigationConfig;