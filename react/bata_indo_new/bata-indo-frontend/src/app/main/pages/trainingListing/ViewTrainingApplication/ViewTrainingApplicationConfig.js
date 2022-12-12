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
			path: '/app/employee-service/training-applications/:trngAppId',
			component: React.lazy(() => import('./ViewTrainingApplication'))
		}
	]
};


export default ProfilePageConfig;
