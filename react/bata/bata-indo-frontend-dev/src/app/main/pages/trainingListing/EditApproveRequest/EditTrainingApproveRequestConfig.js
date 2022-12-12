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
			path: '/app/claim-requests/approve-training-request/:trngAppId',
			component: React.lazy(() => import('./EditApproveRequest'))
		}
	]
};


export default ProfilePageConfig;
