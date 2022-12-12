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
            path: '/app/poll-survey/manage-poll/:pollsurveyId',
            component: React.lazy(() => import('./UserToPoll'))
        }
    ]
};


export default ProfilePageConfig;