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
			path: '/app/cashier-requests/advance-imprest',
			component: React.lazy(() => import('./AdvanceImprestCashier'))
		}
	]
};


export default ProfilePageConfig;
