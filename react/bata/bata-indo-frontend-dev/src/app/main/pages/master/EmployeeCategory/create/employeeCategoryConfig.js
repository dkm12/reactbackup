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
			path: '/app/master/employeecategory/create/:ecId',
			component: React.lazy(() => import('./employeeCategory'))
		}
	]
};


export default ProfilePageConfig;
