import React from 'react';
import {authRoles} from 'app/auth';

const ImagesViewPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/gallery/img/:folderId/:folderName',
			component: React.lazy(() => import('./ViewPage'))
		}
	]
};

export default ImagesViewPageConfig;
