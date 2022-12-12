import React from 'react';
import { authRoles } from 'app/auth';

const MasterSurveysConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.pollAdmin,//['admin',staff']
	routes: [
		{
			path: '/app/poll-survey/PollMaster',
			component: React.lazy(() => import('./PollMaster'))
		}
	]
};


export default MasterSurveysConfig;
