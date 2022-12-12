import React from 'react';
import {authRoles} from 'app/auth';

const OurValuesConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/our-organization/our-values',
			component: React.lazy(() => import('./OurValuesPage'))
		}
	]
};

export default OurValuesConfig;
