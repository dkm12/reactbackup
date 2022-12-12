import { combineReducers } from '@reduxjs/toolkit';

import empLeaveHistorys from './empLeaveHistorysSlice';
import empLeaveRequest from './empLeaveRequestSlice';
import empLeaveRequests from './empLeaveRequestsSlice';
import empApproveLeave from './empApproveLeaveSlice';
import empApproveLeaves from './empApproveLeavesSlice';

const reducer = combineReducers({
	empLeaveHistorys,
	empLeaveRequest,
	empLeaveRequests,
	empApproveLeave,
	empApproveLeaves
});

export default reducer;
