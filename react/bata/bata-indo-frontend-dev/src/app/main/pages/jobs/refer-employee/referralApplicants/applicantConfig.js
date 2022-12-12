import React from 'react';
import {authRoles} from 'app/auth';

const RefApplicantPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.hr,//['admin',staff']
	routes: [
		{
			path: '/app/jobs/refer-emp/refapplicants',
			component: React.lazy(() => import('./applicant'))
		}
	]
};

export default RefApplicantPageConfig;
