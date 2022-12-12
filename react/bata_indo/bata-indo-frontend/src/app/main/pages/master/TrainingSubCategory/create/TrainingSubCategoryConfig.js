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
			path: '/app/master/trainingSubCategory/create/:trngSubcatId',
			component: React.lazy(() => import('./TrainingSubCategory'))
		}
	]
};


export default ProfilePageConfig;
