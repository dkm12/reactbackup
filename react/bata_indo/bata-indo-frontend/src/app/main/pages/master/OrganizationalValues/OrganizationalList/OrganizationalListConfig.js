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
			path: '/app/master/organizational-values/listing',
			component: React.lazy(() => import('./OrganizationalList'))
		}
	]
};


export default ProfilePageConfig;
