import React from 'react';
import { authRoles } from 'app/auth';

const VideosViewPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/gallery/videosfolderpage',
			component: React.lazy(() => import('./ViewPage'))
		}
	]
};

export default VideosViewPageConfig;
