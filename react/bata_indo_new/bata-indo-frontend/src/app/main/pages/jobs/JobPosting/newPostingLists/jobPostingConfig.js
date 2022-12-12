import React from 'react';
import {authRoles} from 'app/auth';

const ProfilePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.hr,//['admin',staff']
	routes: [
		{
			path: '/app/jobs/jobposting/newpostingLists',
			component: React.lazy(() => import('./jobPosting'))
		}
	]
};


export default ProfilePageConfig;
