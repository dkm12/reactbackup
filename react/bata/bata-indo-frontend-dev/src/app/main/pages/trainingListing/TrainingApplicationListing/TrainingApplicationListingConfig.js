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
			path: '/app/hr-services/training-applications',
			component: React.lazy(() => import('./TrainingApplicationListing'))
		}
	]
};


export default ProfilePageConfig;
