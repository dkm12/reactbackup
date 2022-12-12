import React from 'react';
import {authRoles} from 'app/auth';

const NewJoineeWithoutRefConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.inductionHr,//['admin',staff']
	routes: [
		{
			path: '/app/jobs/new-joinee-form',
			component: React.lazy(() => import('./joineeForm'))
		}
	]
};

export default NewJoineeWithoutRefConfig;