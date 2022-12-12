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
			path: '/app/master/travelmodeeligibility/create/:tmeId',
			component: React.lazy(() => import('./TravelModeEligibility'))
		}
	]
};


export default ProfilePageConfig;
