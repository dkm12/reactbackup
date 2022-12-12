import { combineReducers } from '@reduxjs/toolkit';
import empLocalConveyance from './empLocalConveyanceSlice';
import empLocalConveyances from './empLocalConveyancesSlice';

import empApproveClaim from './empApproveClaimSlice';
import empApproveClaims from './empApproveClaimsSlice';

import empLocalClaimHistorys from './empLocalClaimHistorysSlice';

import empLocalConveyanceCashiers from './empLocalConveyanceCashiersSlice';
import empPayLocalConveyance from './empPayLocalConveyanceSlice';

const reducer = combineReducers({
	empLocalClaimHistorys,
	empLocalConveyances,
	empLocalConveyance,
	empApproveClaim,
	empApproveClaims,
	empLocalConveyanceCashiers,
	empPayLocalConveyance,
});

export default reducer;
