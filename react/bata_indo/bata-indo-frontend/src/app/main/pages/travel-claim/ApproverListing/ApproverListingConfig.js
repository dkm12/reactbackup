import React from 'react';

const ProfilePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/app/claim-request/approver-listing',
			component: React.lazy(() => import('./ApproverListing'))
		}
	]
};


export default ProfilePageConfig;
