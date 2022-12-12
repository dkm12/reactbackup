import React from 'react';
import {authRoles} from 'app/auth';

const DocumentListConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/app/document-library/:folderId/:folderName',
			component: React.lazy(() => import('./DocumentListPage'))
		}
	]
};

export default DocumentListConfig;
