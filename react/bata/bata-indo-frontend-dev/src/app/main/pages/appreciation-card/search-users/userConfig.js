import React from 'react';
import {authRoles} from 'app/auth';

const appreciationConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,
	routes: [
		{
			path: '/app/appreciation/search-user',
			component: React.lazy(() => import('./user'))
		}
	]
};

export default appreciationConfig;
