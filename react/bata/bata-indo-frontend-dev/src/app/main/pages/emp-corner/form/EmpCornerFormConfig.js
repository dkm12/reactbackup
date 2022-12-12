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
			path: '/app/empCorner/form/:topicId',
			component: React.lazy(() => import('./EmpCornerForm'))
		}
	]
};


export default ProfilePageConfig;
