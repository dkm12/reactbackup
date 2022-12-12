import React from 'react';
import { authRoles } from 'app/auth';

const ProfilePageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.pollAdmin,//['admin',staff']
    routes: [
        {
            path: '/app/poll-survey/PollCreate/:sID/:type',
            component: React.lazy(() => import('./Poll&Survey'))
        }
    ]
};


export default ProfilePageConfig;