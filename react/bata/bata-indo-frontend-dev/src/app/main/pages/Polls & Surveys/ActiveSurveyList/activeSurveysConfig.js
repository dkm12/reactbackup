import React from 'react';
import { authRoles } from 'app/auth';

const ActiveSurveysConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/poll-survey/active-surveys',
			component: React.lazy(() => import('./activeSurveys'))
		}
	]
};


export default ActiveSurveysConfig;
