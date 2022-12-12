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
			path: '/app/master/department/create/:dptId',
			component: React.lazy(() => import('./department'))
		}
	]
};


export default ProfilePageConfig;
