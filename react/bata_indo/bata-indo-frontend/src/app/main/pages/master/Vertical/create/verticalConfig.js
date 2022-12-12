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
			path: '/app/master/vertical/create/:vtId',
			component: React.lazy(() => import('./vertical'))
		}
	]
};


export default ProfilePageConfig;
