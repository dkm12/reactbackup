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
			path: '/app/master/localmodeoftravel/create/:lmotId',
			component: React.lazy(() => import('./localModeOfTravel'))
		}
	]
};


export default ProfilePageConfig;
