import React from 'react';
import {authRoles} from 'app/auth';

const ReferalApplicationForm = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/jobs/refer-emp/application-form/:jobId/:type',
			component: React.lazy(() => import('./CreatePage'))
		}
	]
};


export default ReferalApplicationForm;
