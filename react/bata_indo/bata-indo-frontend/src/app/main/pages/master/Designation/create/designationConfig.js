import React from 'react';
import { authRoles } from 'app/auth';

const ProfilePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/master/designation/create/:dsgId',
			component: React.lazy(() => import('./designation'))
		}
	]
};


export default ProfilePageConfig;
