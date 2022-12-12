import React from 'react';
import {authRoles} from 'app/auth';

const ReferralApplicantListConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.hr,//['admin',staff']
	routes: [
		{
			path: '/app/jobs/refer-emp/applicant-list',
			component: React.lazy(() => import('./listing'))
		}
	]
};

export default ReferralApplicantListConfig;
