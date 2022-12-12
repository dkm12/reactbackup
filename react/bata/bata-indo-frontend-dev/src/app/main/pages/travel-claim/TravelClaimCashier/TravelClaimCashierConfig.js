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
			path: '/app/cashier-requests/travel-claim',
			component: React.lazy(() => import('./TravelClaimCashier'))
		}
	]
};


export default ProfilePageConfig;
