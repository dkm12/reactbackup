import React from 'react';
import {authRoles} from 'app/auth';

const DocumentFoldersConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/document-library',
			component: React.lazy(() => import('./DocumentFolderPage'))
		}
	]
};

export default DocumentFoldersConfig;
