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
			path: '/app/announcement/list',
			component: React.lazy(() => import('./announcementList'))
		}
	]
};


export default ProfilePageConfig;
