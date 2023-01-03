import i18next from 'i18next';

import en from './navigation-i18n/en';

i18next.addResourceBundle('en', 'navigation', en);

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
		id: 'Retete',
		title: 'Retete',
		translate: 'Retete',
		type: 'item',
		icon: 'store_front',
		url: '/apps/e-commerce/retete'
	},
	{
		id: 'ingrediente',
		title: 'Ingrediente',
		translate: 'Ingrediente',
		type: 'item',
		icon: 'account_box',
		url: '/apps/event-app/all'
	}
];

export default navigationConfig;
