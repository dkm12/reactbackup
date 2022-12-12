import React from 'react';
import {authRoles} from 'app/auth';

const NewJoineeConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.inductionHr,//['admin',staff']
	routes: [
		{
			path: '/app/jobs/refer-emp/new-joinee-form/:id',
			component: React.lazy(() => import('./joineeForm'))
		}
	]
};

export default NewJoineeConfig;