import React from 'react';
import {authRoles} from 'app/auth';

const RefNewPostListPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.talentHr,//['admin',staff']
	routes: [
		{
			path: '/app/jobs/refer-emp/refnewpostingLists',
			component: React.lazy(() => import('./jobPosting'))
		}
	]
};

export default RefNewPostListPageConfig;
