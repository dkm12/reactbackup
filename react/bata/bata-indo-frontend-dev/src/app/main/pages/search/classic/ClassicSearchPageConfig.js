import React from 'react';

const ClassicSearchPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/app/pages/search/classic',
			component: React.lazy(() => import('./ClassicSearchPage'))
		}
	]
};

export default ClassicSearchPageConfig;
