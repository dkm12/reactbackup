import { combineReducers } from '@reduxjs/toolkit';

import empTrainingForm from './empTrainingFormSlice';
import empTrainingLists from './empTrainingListsSlice';

import empOpenTrainingList from './empOpenTrainingListSlice';
import empAppliedTrainingList from './empAppliedTrainingListSlice';

import empViewTraining from './empViewTrainingSlice';
import empApproverListing from './empApproverListingSlice';
import empApproveRequest from './empApproveRequestSlice';

import empTrainingApplicationListing from './empTrainingApplicationListingSlice';
import empTrainingApplication from './empTrainingApplicationSlice';

import empClaimHistorys from './empClaimHistorysSlice';
const reducer = combineReducers({
	empTrainingForm,
	empTrainingLists,
	empOpenTrainingList,
	empAppliedTrainingList,
	empViewTraining,
	empApproverListing,
	empApproveRequest,
	empTrainingApplicationListing,
	empTrainingApplication,
	empClaimHistorys
});

export default reducer;
