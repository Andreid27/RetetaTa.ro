import i18next from 'i18next';

import en from './navigation-i18n/en';

i18next.addResourceBundle('en', 'navigation', en);

const navigationConfig = [
	{
		id: 'Retete',
		title: 'Retete',
		translate: 'Retete',
		type: 'item',
		icon: 'store_front',
		url: '/apps/reteteApp/retete'
	},
	{
		id: 'ingrediente',
		title: 'Ingrediente',
		translate: 'Ingrediente',
		type: 'item',
		icon: 'local_grocery_store',
		url: '/apps/event-app/all'
	}
];

export default navigationConfig;
