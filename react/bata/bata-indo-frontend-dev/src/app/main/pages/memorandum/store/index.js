import { combineReducers } from '@reduxjs/toolkit';

import empAddMemorandum from './empAddMemorandumSlice';
import empMemorandumListing from './empMemorandumListingSlice';

import empEditApproveMemorandum from './empEditApproveMemorandumSlice';
import empApproveMemorandumListing from './empApproveMemorandumListingSlice';

import empEditConsentMemorandum from './empEditConsentMemorandumSlice';
import empConsentMemorandumListing from './empConsentMemorandumListingSlice';

import empMemoDescHistory from './empMemoDescHistorySlice';
const reducer = combineReducers({
	empAddMemorandum,
	empMemorandumListing,
	empEditApproveMemorandum,
	empApproveMemorandumListing,
	empEditConsentMemorandum,
	empConsentMemorandumListing,
	empMemoDescHistory
});

export default reducer;
