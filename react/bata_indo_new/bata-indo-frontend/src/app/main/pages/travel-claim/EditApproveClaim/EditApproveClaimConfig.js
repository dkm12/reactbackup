import React from 'react';
import { authRoles } from 'app/auth';

const ProfilePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/claim-requests/approve-travel-claim/:travelClaimId',
			component: React.lazy(() => import('./EditApproveClaim'))
		}
	]
};


export default ProfilePageConfig;
