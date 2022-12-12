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
			path: '/app/pages/testpage',
			component: React.lazy(() => import('./TestPage'))
		},	
		{
			path: '/app/pages/test-table',
			component: React.lazy(() => import('./TestTable'))
		},		
		{
			path: '/app/pages/testpage2',
			component: React.lazy(() => import('./TestPage-22'))
		},	
		{
			path: '/app/pages/tabPanel',
			component: React.lazy(() => import('./TabPanel'))
		}
	]
};

export default ProfilePageConfig;
