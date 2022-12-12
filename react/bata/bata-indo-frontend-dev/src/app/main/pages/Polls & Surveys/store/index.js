import { combineReducers } from '@reduxjs/toolkit';

import empPollMasters from './empPollMastersSlice';
import pollMasterSlice from './empPollMasterSlice';
import activePollSlice from './empPollActiveSlice';
import currGraphSlice from './graphSlice';

const reducer = combineReducers({
    empPollMasters,
    pollMasterSlice,
    activePollSlice,
    currGraphSlice,
});

export default reducer;