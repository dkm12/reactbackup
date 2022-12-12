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
			path: '/app/employee-service/internal-memorandum/:memorandumId',
			component: React.lazy(() => import('./InternalMemorandum'))
		}
	]
};


export default ProfilePageConfig;
