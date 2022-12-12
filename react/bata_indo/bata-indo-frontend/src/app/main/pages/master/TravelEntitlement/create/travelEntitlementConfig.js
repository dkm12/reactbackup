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
			path: '/app/master/travelentitlement/create/:teId',
			component: React.lazy(() => import('./travelEntitlement'))
		}
	]
};


export default ProfilePageConfig;
