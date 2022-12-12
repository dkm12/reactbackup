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
			path: '/app/master/travelrate/create/:trId',
			component: React.lazy(() => import('./travelRate'))
		}
	]
};


export default ProfilePageConfig;
