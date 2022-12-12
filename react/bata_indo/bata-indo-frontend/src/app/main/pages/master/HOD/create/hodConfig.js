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
			path: '/app/master/hod/create/:hodId',
			component: React.lazy(() => import('./hod'))
		}
	]
};


export default ProfilePageConfig;
