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
			path: '/app/employee-service/consent-memorandum/:memorandumId',
			component: React.lazy(() => import('./EditConsentMemorandum'))
		}
	]
};


export default EditApproveCashRemClaimConfig;
