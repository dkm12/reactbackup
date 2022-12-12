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
			path: '/app/employee-service/memorandum',
			component: React.lazy(() => import('./MemorandumListing'))
		}
	]
};


export default ProfilePageConfig;
