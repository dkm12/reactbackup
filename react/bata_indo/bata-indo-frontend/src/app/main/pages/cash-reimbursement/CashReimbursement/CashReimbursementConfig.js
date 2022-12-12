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
			path: '/app/employee-service/cash-reimbursement',
			component: React.lazy(() => import('./CashReimbursement'))
		}
	]
};


export default ProfilePageConfig;
