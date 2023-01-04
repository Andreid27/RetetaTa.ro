import React from 'react';
import { Redirect } from 'react-router-dom';

const IngredienteAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/ingredienteApp/ingrediente/:ingredientId/:productHandle?',
			component: React.lazy(() => import('./ingredient/Ingredient'))
		},
		{
			path: '/apps/ingredienteApp/',
			component: React.lazy(() => import('./ingrediente/Ingrediente'))
		},
		{
			path: '/apps/ingredienteApp',
			component: () => <Redirect to="/apps/ingredienteApp/" />
		}
	]
};

export default IngredienteAppConfig;
