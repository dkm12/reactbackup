import React from 'react';

const Register2PageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/app/pages/auth/register-2',
			component: React.lazy(() => import('./Register2Page'))
		}
	]
};

export default Register2PageConfig;
