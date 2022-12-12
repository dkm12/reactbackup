import React from 'react';

const KnowledgeBasePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/app/pages/knowledge-base',
			component: React.lazy(() => import('./KnowledgeBasePage'))
		}
	]
};

export default KnowledgeBasePageConfig;
