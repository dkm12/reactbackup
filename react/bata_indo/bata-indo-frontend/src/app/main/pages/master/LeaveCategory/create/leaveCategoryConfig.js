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
			path: '/app/master/leavecategory/create/:leaveCategoryId',
			component: React.lazy(() => import('./leaveCategory'))
		}
	]
};


export default ProfilePageConfig;
