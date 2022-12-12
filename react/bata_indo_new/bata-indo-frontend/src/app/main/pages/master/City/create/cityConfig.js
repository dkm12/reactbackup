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
			path: '/app/master/city/create/:cityId',
			component: React.lazy(() => import('./city'))
		}
	]
};


export default ProfilePageConfig;
