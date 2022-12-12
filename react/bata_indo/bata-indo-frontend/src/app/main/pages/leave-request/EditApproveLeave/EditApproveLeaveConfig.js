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
			path: '/app/hr-services/approve-leaves/:leaveRequestId',
			component: React.lazy(() => import('./EditApproveLeave'))
		}
	]
};


export default ProfilePageConfig;
