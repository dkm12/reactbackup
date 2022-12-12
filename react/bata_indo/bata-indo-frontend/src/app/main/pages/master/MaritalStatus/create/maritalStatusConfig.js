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
			path: '/app/master/maritalStatus/create/:msId',
			component: React.lazy(() => import('./maritalStatus'))
		}
	]
};


export default ProfilePageConfig;
