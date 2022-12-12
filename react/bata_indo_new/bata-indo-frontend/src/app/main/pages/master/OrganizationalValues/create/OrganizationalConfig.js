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
			path: '/app/master/organizational/create/:orgValId',
			component: React.lazy(() => import('./Organizational'))
		}
	]
};


export default ProfilePageConfig;
