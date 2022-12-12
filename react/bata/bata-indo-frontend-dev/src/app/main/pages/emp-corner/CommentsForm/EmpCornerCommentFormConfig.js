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
			path: '/app/empCorner/commentform/:commentId/:topicId',
			component: React.lazy(() => import('./EmpCornerCommentForm'))
		}
	]
};


export default ProfilePageConfig;
