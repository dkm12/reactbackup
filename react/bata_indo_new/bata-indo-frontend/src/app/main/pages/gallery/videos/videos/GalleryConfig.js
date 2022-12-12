import React from 'react';
import {authRoles} from 'app/auth';

const GalleryViewPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth    : authRoles.employee,//['admin',staff']
	routes: [
		{
			path: '/gallery/contents/:folderId/:folderName',
			component: React.lazy(() => import('./galleryView'))
		}
	]
};

export default GalleryViewPageConfig;
