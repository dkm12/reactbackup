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
			path: '/app/cashier-requests/advance-imprest/:advanceImprestId',
			component: React.lazy(() => import('./PayAdvanceImprest'))
		}
	]
};


export default ProfilePageConfig;
