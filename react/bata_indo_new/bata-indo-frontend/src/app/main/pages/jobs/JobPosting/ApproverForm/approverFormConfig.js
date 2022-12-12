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
			path: '/app/jobs/jobposting/approverForm/:ijpRId',
			component: React.lazy(() => import('./approverForm'))
		}
	]
};


export default ProfilePageConfig;
