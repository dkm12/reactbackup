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
			path: '/app/master/employee-category/listing',
			component: React.lazy(() => import('./EmployeeCategoryList'))
		}
	]
};


export default ProfilePageConfig;
