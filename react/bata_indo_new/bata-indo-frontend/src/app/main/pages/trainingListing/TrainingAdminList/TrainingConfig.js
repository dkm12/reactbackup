import React from 'react';
import {authRoles} from 'app/auth';

const ProfilePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/hr-services/training-admin-list',
			component: React.lazy(() => import('./Training'))
		}
	]
};


export default ProfilePageConfig;
