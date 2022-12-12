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
			path: '/app/employee-service/advance-imprest',
			component: React.lazy(() => import('./AdvanceImprest'))
		}
	]
};


export default ProfilePageConfig;
