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
			path: '/app/master/employeeType/create/:employeeTypeId',
			component: React.lazy(() => import('./employeeType'))
		}
	]
};


export default ProfilePageConfig;
