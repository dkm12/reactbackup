import React from 'react';

const ModernSearchPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/app/pages/search/modern',
			component: React.lazy(() => import('./ModernSearchPage'))
		}
	]
};

export default ModernSearchPageConfig;
