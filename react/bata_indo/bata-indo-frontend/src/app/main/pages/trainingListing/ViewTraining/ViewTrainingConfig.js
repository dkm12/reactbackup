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
			path: '/app/employee-service/view-training/:trainingId',
			component: React.lazy(() => import('./ViewTraining'))
		}
	]
};


export default ProfilePageConfig;
