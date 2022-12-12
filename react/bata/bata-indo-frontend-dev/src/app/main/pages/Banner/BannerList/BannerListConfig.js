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
			path: '/app/master/banner/list',
			component: React.lazy(() => import('./BannerList'))
		}
	]
};


export default ProfilePageConfig;
