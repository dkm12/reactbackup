import React from 'react';
import {authRoles} from 'app/auth';

const TestdummyCpmpConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/pages/dummyTest',
			component: React.lazy(() => import('./dummyTestPage'))
		},			
		
	]
};

export default TestdummyCpmpConfig;
