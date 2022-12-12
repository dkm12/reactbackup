import React from 'react';

const MaintenancePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/app/pages/maintenance',
			component: React.lazy(() => import('./MaintenancePage'))
		}
	]
};

export default MaintenancePageConfig;
