import { combineReducers } from '@reduxjs/toolkit';

import empLeaveHistorys from './empLeaveHistorysSlice';
import empLeaveRequest from './empLeaveRequestSlice';
import empLeaveRequests from './empLeaveRequestsSlice';
import empApproveLeave from './empApproveLeaveSlice';
import empApproveLeaves from './empApproveLeavesSlice';
import empApproveLeavesHR from './hrLeaveListSlice'

const reducer = combineReducers({
	empLeaveHistorys,
	empLeaveRequest,
	empLeaveRequests,
	empApproveLeave,
	empApproveLeaves,
	empApproveLeavesHR
});

export default reducer;
