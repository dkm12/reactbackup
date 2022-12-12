import { combineReducers } from '@reduxjs/toolkit';

import empCashReimbursement from './empCashReimbursementSlice';
import empCashReimbursements from './empCashReimbursementsSlice';

import empApproveClaim from './empApproveClaimSlice';
import empApproveClaims from './empApproveClaimsSlice';

import empClaimHistorys from './empClaimHistorysSlice';

import empCashReimbursementCashiers from './empCashReimbursementCashiersSlice';
import empPayCashReimbursement from './empPayCashReimbursementSlice';

const reducer = combineReducers({
	empClaimHistorys,
	empCashReimbursement,
	empCashReimbursements,
	empApproveClaim,
	empApproveClaims,
	empPayCashReimbursement,
	empCashReimbursementCashiers
	
});

export default reducer;
