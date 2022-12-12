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
            path: '/app/empCorner/reportPage/:topicId/:type/:commentId',
            component: React.lazy(() => import('./ReportPage'))
        }
    ]
};


export default ProfilePageConfig;