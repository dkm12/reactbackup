import React from 'react';
import {authRoles} from 'app/auth';

const InternalNewJoineeConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.inductionHr,//['admin',staff']
	routes: [
		{
			path: '/app/jobs/internal-job-emp/new-joinee-form/:id',
			component: React.lazy(() => import('./joineeForm'))
		}
	]
};

export default InternalNewJoineeConfig;