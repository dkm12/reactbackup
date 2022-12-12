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
			path: '/app/cashier-requests/travel-claim/:travelClaimId',
			component: React.lazy(() => import('./PayTravelClaim'))
		}
	]
};


export default ProfilePageConfig;
