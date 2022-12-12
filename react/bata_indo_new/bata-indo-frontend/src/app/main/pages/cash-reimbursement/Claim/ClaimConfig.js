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
			path: '/app/employee-service/cash-reimbursement/:cashReimbursementId',
			component: React.lazy(() => import('./Claim'))
		}
	]
};


export default ProfilePageConfig;
