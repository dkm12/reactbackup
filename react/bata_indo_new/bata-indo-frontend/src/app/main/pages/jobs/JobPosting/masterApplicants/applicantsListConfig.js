import React from 'react';
import {authRoles} from 'app/auth';

const MasterApplicantsConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/jobs/jobposting/applicants-master',
			component: React.lazy(() => import('./applicantsList'))
		}
	]
};


export default MasterApplicantsConfig;
