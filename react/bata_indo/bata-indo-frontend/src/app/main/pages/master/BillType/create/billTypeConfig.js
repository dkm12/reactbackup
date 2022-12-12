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
			path: '/app/master/billtype/create/:billTypeId',
			component: React.lazy(() => import('./billType'))
		}
	]
};


export default ProfilePageConfig;
