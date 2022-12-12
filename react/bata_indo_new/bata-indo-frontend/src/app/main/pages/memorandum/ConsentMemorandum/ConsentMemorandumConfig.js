import React from 'react';
import {authRoles} from 'app/auth';

const ConsentMemorandumConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/employee-service/consent-memorandum',
			component: React.lazy(() => import('./ConsentMemorandum'))
		}
	]
};


export default ConsentMemorandumConfig;
