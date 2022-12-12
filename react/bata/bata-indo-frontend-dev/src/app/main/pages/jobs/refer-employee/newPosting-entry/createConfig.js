import React from 'react';
import {authRoles} from 'app/auth';

const RefferalJobEntryForm = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.talentHr,//['admin',staff']
	routes: [
		{
			path: '/app/jobs/refer-emp/ref-job-entry/:id',
			component: React.lazy(() => import('./CreatePage'))
		}
	]
};

export default RefferalJobEntryForm;