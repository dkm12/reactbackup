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
			path: '/app/hr-services/training-applications/:trngAppId',
			component: React.lazy(() => import('./EditTrainingApplication'))
		}
	]
};


export default ProfilePageConfig;
