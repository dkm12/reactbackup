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
			path: '/app/workAnniversary/list',
			component: React.lazy(() => import('./WorkAnniversaryList'))
		}
	]
};


export default ProfilePageConfig;
