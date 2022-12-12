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
			path: '/app/birthday/list',
			component: React.lazy(() => import('./BirthdayList'))
		}
	]
};


export default ProfilePageConfig;
