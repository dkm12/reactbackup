import { combineReducers } from '@reduxjs/toolkit';

import empAdvanceImprest from './empAdvanceImprestSlice';
import empAdvanceImprests from './empAdvanceImprestsSlice';

import empApproveClaim from './empApproveClaimSlice';
import empApproveClaims from './empApproveClaimsSlice';

import empClaimHistorys from './empClaimHistorysSlice';

import empAdvanceImprestCashiers from './empAdvanceImprestCashiersSlice';
import empPayAdvanceImprest from './empPayAdvanceImprestSlice';

const reducer = combineReducers({
	empClaimHistorys,
	empAdvanceImprest,
	empAdvanceImprests,
	empApproveClaim,
	empApproveClaims,
	empPayAdvanceImprest,
	empAdvanceImprestCashiers
	
});

export default reducer;
