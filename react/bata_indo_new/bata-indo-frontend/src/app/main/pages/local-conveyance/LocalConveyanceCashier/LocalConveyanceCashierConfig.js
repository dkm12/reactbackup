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
			path: '/app/cashier-requests/local-claim-cashier',
			component: React.lazy(() => import('./LocalConveyanceCashier'))
		}
	]
};


export default ProfilePageConfig;
