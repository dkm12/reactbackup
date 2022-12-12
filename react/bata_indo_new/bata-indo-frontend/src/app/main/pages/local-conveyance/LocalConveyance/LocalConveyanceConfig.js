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
			path: '/app/employee-service/local-conveyance',
			component: React.lazy(() => import('./LocalConveyance'))
		}
	]
};


export default ProfilePageConfig;
