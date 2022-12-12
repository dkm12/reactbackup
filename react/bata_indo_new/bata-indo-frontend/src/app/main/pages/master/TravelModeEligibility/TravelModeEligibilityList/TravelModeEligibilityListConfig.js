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
			path: '/app/master/travel-mode-eligibility/listing',
			component: React.lazy(() => import('./TravelModeEligibilityList'))
		}
	]
};


export default ProfilePageConfig;
