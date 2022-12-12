import React from 'react';
import {authRoles} from 'app/auth';

const HomeConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/home',
			component: React.lazy(() => import('./HomePage'))
		}
	]
};

export default HomeConfig;
