import React from 'react';
import {authRoles} from 'app/auth';

const ProfilePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/jobs/jobposting/applicants',
			component: React.lazy(() => import('./applicantsList'))
		}
	]
};


export default ProfilePageConfig;
