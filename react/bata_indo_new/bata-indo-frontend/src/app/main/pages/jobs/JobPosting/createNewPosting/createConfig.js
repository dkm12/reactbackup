import React from 'react';
import {authRoles} from 'app/auth';

const ProfilePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.talentHr,//['admin',staff']
	routes: [
		{
			path: '/app/jobs/jobposting/createNewPosting/:jpId',
			component: React.lazy(() => import('./create'))
		}
	]
};

export default ProfilePageConfig;
