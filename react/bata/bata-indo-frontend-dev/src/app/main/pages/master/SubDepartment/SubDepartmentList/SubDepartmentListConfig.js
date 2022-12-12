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
			path: '/app/master/subDepartment/listing',
			component: React.lazy(() => import('./SubDepartmentList'))
		}
	]
};


export default ProfilePageConfig;
