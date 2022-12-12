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
			path: '/app/master/modeOfTravel/create/:motId',
			component: React.lazy(() => import('./modeOfTravel'))
		}
	]
};


export default ProfilePageConfig;
