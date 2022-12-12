import { combineReducers } from '@reduxjs/toolkit';

import empTravelClaim from './empTravelClaimSlice';
import empTravelClaims from './empTravelClaimsSlice';

import empApproveClaim from './empApproveClaimSlice';
import empApproveClaims from './empApproveClaimsSlice';

import empClaimHistorys from './empClaimHistorysSlice';

import empTravelClaimCashiers from './empTravelClaimCashiersSlice';
import empPayTravelClaim from './empPayTravelClaimSlice';

const reducer = combineReducers({
	empClaimHistorys,
	empTravelClaim,
	empTravelClaims,
	empApproveClaim,
	empApproveClaims,
	empPayTravelClaim,
	empTravelClaimCashiers
	
});

export default reducer;
