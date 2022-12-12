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
            path: '/app/empCorner/detailPage/:topicId',
            component: React.lazy(() => import('./DetailPage'))
        }
    ]
};


export default ProfilePageConfig;