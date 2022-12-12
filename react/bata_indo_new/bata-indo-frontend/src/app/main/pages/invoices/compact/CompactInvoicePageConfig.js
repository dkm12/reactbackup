import React from 'react';

const CompactInvoicePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/app/pages/invoices/compact',
			component: React.lazy(() => import('./CompactInvoicePage'))
		}
	]
};

export default CompactInvoicePageConfig;
