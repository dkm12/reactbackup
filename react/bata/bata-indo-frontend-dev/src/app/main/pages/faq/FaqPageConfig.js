import React from 'react';

const FaqPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/app/pages/faq',
			component: React.lazy(() => import('./FaqPage'))
		}
	]
};

export default FaqPageConfig;
