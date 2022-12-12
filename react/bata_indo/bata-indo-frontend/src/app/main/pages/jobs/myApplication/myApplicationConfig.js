import React from 'react';
import {authRoles} from 'app/auth';

const MyApplicationsConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/jobs/my-applications',
			component: React.lazy(() => import('./myApplication'))
		}
	]
};

export default MyApplicationsConfig;
