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
			path: '/app/master/modeOfTravel/create',
			component: React.lazy(() => import('./ModeOfTravelList'))
		}
	]
};


export default ProfilePageConfig;
