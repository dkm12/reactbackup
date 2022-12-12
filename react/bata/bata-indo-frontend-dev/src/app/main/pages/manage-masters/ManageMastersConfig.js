import React from 'react';
import {authRoles} from 'app/auth';

const ManageMastersConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/manage-masters',
			component: React.lazy(() => import('./ManageMastersPage'))
		}
	]
};

export default ManageMastersConfig;
