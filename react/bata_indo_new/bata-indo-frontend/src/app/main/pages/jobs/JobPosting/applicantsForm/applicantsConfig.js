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
			path: '/app/jobs/jobposting/applicantsForm/:jbdId',
			component: React.lazy(() => import('./applicants'))
		}
	]
};


export default ProfilePageConfig;
