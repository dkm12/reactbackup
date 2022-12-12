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
            path: '/app/master/banner/create/:id',
            component: React.lazy(() => import('./Upload'))
        }
    ]
};


export default ProfilePageConfig;