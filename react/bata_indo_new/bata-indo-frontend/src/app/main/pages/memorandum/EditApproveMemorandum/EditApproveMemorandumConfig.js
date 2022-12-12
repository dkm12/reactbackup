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
			path: '/app/claim-requests/approve-memorandum/:memorandumId',
			component: React.lazy(() => import('./EditApproveMemorandum'))
		}
	]
};


export default EditApproveCashRemClaimConfig;
