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
			path: '/app/master/travelrate/create',
			component: React.lazy(() => import('./TravelRateList'))
		}
	]
};


export default ProfilePageConfig;
