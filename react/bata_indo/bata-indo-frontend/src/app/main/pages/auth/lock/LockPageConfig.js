import React from 'react';

const LockPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/app/pages/auth/lock',
			component: React.lazy(() => import('./LockPage'))
		}
	]
};

export default LockPageConfig;
