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
			path: '/app/empCorner/list',
			component: React.lazy(() => import('./EmpCornerList'))
		}
	]
};


export default ProfilePageConfig;
