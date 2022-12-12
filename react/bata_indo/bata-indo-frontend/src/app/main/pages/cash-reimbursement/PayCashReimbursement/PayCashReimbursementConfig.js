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
			path: '/app/cashier-requests/cash-reimbursement/:cashReimbursementId',
			component: React.lazy(() => import('./PayCashReimbursement'))
		}
	]
};


export default ProfilePageConfig;
