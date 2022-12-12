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
			path: '/app/employee-service/open-training-list',
			component: React.lazy(() => import('./OpenTrainingList'))
		}
	]
};


export default ProfilePageConfig;
