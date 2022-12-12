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
			path: '/app/master/location/create/:locId',
			component: React.lazy(() => import('./location'))
		}
	]
};


export default ProfilePageConfig;
