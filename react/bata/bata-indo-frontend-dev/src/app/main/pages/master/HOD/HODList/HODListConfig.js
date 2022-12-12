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
			path: '/app/master/hod/listing',
			component: React.lazy(() => import('./HODList'))
		}
	]
};


export default ProfilePageConfig;
