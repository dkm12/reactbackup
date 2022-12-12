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
            path: '/app/employee-service/approve-local-claim',
            component: React.lazy(() => import('./ApproveClaim'))
        }
    ]
};
export default ProfilePageConfig;
