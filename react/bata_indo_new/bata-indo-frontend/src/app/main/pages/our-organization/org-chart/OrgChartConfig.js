import React from 'react';
import {authRoles} from 'app/auth';

const OrgChartConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/our-organization/org-chart',
			component: React.lazy(() => import('./OrgChartPage'))
		}
	]
};

export default OrgChartConfig;
