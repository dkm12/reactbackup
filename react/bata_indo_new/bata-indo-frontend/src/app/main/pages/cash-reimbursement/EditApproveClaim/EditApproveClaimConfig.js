import React from 'react';
import { authRoles } from 'app/auth';

const EditApproveCashRemClaimConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/claim-requests/approve-cash-reimbursement/:cashReimbursementId',
			component: React.lazy(() => import('./EditApproveClaim'))
		}
	]
};


export default EditApproveCashRemClaimConfig;
