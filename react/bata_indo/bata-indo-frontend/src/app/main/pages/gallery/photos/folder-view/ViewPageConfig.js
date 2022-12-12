import React from 'react';
import {authRoles} from 'app/auth';

const ViewPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/gallery/imgfolderpage',
			component: React.lazy(() => import('./ViewPage'))
		}
	]
};

export default ViewPageConfig;
