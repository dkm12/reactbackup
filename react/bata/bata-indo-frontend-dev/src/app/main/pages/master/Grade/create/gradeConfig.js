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
			path: '/app/master/grade/create/:gradeId',
			component: React.lazy(() => import('./grade'))
		}
	]
};


export default ProfilePageConfig;
