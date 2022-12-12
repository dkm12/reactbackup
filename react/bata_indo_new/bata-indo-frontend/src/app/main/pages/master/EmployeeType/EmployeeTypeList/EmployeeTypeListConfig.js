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
			path: '/app/master/employee-type/listing',
			component: React.lazy(() => import('./EmployeeTypeList'))
		}
	]
};


export default ProfilePageConfig;
