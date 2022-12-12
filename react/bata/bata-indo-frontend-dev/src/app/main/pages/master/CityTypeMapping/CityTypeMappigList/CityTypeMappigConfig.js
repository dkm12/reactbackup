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
			path: '/app/master/city-type-mapping/listing',
			component: React.lazy(() => import('./CityTypeMappig'))
		}
	]
};


export default ProfilePageConfig;
