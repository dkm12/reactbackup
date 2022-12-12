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
			path: '/app/master/vertical/listing',
			component: React.lazy(() => import('./VerticalList'))
		}
	]
};


export default ProfilePageConfig;
