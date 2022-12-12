import React from 'react';
import {authRoles} from 'app/auth';

const RefActivePostListPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/jobs/refer-emp/ref-active-postings',
			component: React.lazy(() => import('./jobposting'))
		}
	]
};

export default RefActivePostListPageConfig;
