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
			path: '/app/trainingListing/TrainingForm/:trgId',
			component: React.lazy(() => import('./TrainingForm'))
		}
	]
};


export default ProfilePageConfig;
