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
			path: '/app/jobs/CurrentInternalJobs',
			component: React.lazy(() => import('./internalJobs'))
		}
	]
};


export default ProfilePageConfig;
