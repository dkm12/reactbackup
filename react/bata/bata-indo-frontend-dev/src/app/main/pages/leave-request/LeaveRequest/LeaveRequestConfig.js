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
			path: '/app/hr-services/leave-requests',
			component: React.lazy(() => import('./LeaveRequest'))
		}
	]
};


export default ProfilePageConfig;
