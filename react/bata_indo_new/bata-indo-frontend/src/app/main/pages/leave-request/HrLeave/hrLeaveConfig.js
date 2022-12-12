import React from 'react';
import {authRoles} from 'app/auth';

const ProfilePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.hr,//['admin',staff']
	routes: [
		{
			path: '/app/claim-requests/hrservices-leaves',
			component: React.lazy(() => import('./ApproveLeave'))
		}
	]
};


export default ProfilePageConfig;
