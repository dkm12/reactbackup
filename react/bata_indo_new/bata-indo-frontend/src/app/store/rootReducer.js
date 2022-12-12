import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import localConveyance from 'app/main/pages/local-conveyance/store';
import leaveRequest from 'app/main/pages/leave-request/store';
import gallery from 'app/main/pages/gallery/store';
import mytask from '@components/MyTasks/store';
import anniversary from '@components/WorkAnniversary/store';
import jobs from 'app/main/pages/jobs/store';
import applicants from 'app/main/pages/jobs/store';
import announcement from '@components/Announcement/store';
import newJoinee from '@components/NewJoiner/store';
import empCorner from '@components/EmpCorner/store';
import pollSurvey from 'app/main/pages/Polls & Surveys/store';
import banner from 'app/main/pages/Banner/store';
import quickLink from 'app/main/pages/QuickLinks/Store';
import notification from 'app/layouts/shared-components/Notification/store';
import fuse from './core';
import i18n from './i18nSlice';
import training from 'app/main/pages/trainingListing/store';

const createReducer = asyncReducers =>
	combineReducers({
		auth,
		fuse,
		i18n,
		localConveyance,
		leaveRequest,
		gallery,
		jobs,
		applicants,
		anniversary,
		announcement,
		newJoinee,
		mytask,
		training,
		pollSurvey,
		empCorner,
		banner,
		quickLink,
		notification,
		...asyncReducers
	});

export default createReducer;
