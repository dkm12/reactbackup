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
			path: '/app/pages/dummyTest/:jpId',
			component: React.lazy(() => import('./dummyTestPage'))
		},
		{
			path: '/app/pages/dummyTestPage/dummyTable',
			component: React.lazy(() => import('./dummyTable'))
		},			
		
	]
};

export default TestdummyCpmpConfig;
