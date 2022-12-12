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
			path: '/app/master/zone/create/:zoneId',
			component: React.lazy(() => import('./zone'))
		}
	]
};


export default ProfilePageConfig;
