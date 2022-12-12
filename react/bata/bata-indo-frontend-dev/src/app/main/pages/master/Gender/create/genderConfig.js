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
			path: '/app/master/gender/create/:genderId',
			component: React.lazy(() => import('./gender'))
		}
	]
};


export default ProfilePageConfig;
