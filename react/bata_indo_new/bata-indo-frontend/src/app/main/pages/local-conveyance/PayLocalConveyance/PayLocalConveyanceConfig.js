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
			path: '/app/cashier-requests/local-claim-cashiers/:localConveyanceId',
			component: React.lazy(() => import('./PayLocalConveyance'))
		}
	]
};


export default ProfilePageConfig;
