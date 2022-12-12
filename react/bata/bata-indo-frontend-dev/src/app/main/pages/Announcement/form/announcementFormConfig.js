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
			path: '/app/announcement/form/:anId',
			component: React.lazy(() => import('./announcementForm'))
		}
	]
};


export default ProfilePageConfig;
