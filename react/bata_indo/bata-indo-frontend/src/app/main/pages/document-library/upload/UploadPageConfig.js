import React from 'react';
import {authRoles} from 'app/auth';

const UploadPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/gallery/upload',
			component: React.lazy(() => import('./UploadPage'))
		}
	]
};

export default UploadPageConfig;
