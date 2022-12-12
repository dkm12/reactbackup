import React from 'react';
import { authRoles } from 'app/auth';

const ProfilePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin,//['admin',staff']
	routes: [
		{
			path: '/app/empCornerReport/list',
			component: React.lazy(() => import('./EmpCornerReportList'))
		}
	]
};


export default ProfilePageConfig;
