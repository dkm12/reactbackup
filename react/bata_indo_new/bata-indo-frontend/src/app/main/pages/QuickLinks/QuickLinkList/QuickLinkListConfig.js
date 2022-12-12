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
			path: '/app/master/quickLink/list',
			component: React.lazy(() => import('./QuickLinkList'))
		}
	]
};


export default ProfilePageConfig;
