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
            path: '/app/employee-service/approve-claims/:localConveyanceId',
            component: React.lazy(() => import('./EditApproveClaim'))
        }
    ]
};


export default ProfilePageConfig;