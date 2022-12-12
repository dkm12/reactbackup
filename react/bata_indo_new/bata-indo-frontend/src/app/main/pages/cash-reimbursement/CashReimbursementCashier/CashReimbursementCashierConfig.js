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
			path: '/app/cashier-requests/cash-reimbursement',
			component: React.lazy(() => import('./CashReimbursementCashier'))
		}
	]
};


export default ProfilePageConfig;
