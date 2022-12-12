import { combineReducers } from '@reduxjs/toolkit';

import quickLinkSave from './quickLinkSaveSlice';
import quickLinkList from './quickLinkList';

const reducer = combineReducers({
    quickLinkSave,
    quickLinkList
});

export default reducer;