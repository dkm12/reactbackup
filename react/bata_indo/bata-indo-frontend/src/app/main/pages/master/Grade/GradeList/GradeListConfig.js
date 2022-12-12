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
			path: '/app/master/grade/listing',
			component: React.lazy(() => import('./GradeList'))
		}
	]
};


export default ProfilePageConfig;
