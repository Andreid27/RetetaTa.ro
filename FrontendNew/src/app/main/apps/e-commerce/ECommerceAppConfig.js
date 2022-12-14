import React from 'react';
import { Redirect } from 'react-router-dom';

const ECommerceAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/e-commerce/products/:productId/:productHandle?',
			component: React.lazy(() => import('./reteta/Reteta'))
		},
		{
			path: '/apps/e-commerce/retete',
			component: React.lazy(() => import('./retete/Retete'))
		},
		{
			path: '/apps/e-commerce/orders/:orderId',
			component: React.lazy(() => import('./order/Order'))
		},
		{
			path: '/apps/e-commerce/orders',
			component: React.lazy(() => import('./orders/Orders'))
		},
		{
			path: '/apps/e-commerce',
			component: () => <Redirect to="/apps/e-commerce/Retete" />
		}
	]
};

export default ECommerceAppConfig;
