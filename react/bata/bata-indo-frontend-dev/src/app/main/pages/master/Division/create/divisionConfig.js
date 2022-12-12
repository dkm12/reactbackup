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
			path: '/app/master/division/create/:divId',
			component: React.lazy(() => import('./division'))
		}
	]
};


export default ProfilePageConfig;
