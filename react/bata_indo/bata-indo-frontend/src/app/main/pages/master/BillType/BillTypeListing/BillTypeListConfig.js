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
			path: '/app/master/bill-type/listing',
			component: React.lazy(() => import('./BillType'))
		}
	]
};


export default ProfilePageConfig;
