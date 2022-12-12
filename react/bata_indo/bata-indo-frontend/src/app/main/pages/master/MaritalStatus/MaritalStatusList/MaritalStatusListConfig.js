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
			path: '/app/master/marital-status/listing',
			component: React.lazy(() => import('./MaritalStatusList'))
		}
	]
};


export default ProfilePageConfig;
