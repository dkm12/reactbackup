import React from 'react';
import {authRoles} from 'app/auth';

const ApproveCashRemClaimConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/claim-requests/approve-cash-reimbursement',
			component: React.lazy(() => import('./ApproveClaim'))
		}
	]
};


export default ApproveCashRemClaimConfig;
