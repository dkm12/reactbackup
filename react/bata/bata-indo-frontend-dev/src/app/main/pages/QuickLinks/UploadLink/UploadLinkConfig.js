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
            path: '/app/master/quickLink/create/:quickLinksId',
            component: React.lazy(() => import('./UploadLink'))
        }
    ]
};


export default ProfilePageConfig;