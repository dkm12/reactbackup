import React from 'react';
import {authRoles} from 'app/auth';

const ProfilePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/claim-requests/training-requests',
			component: React.lazy(() => import('./ApproverListing'))
		}
	]
};


export default ProfilePageConfig;
