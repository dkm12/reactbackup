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
			path: '/app/master/localeligibility/create/:ltmeId',
			component: React.lazy(() => import('./LocalTravelModeEligibility'))
		}
	]
};


export default ProfilePageConfig;
