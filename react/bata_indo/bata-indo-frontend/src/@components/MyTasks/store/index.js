import { combineReducers } from '@reduxjs/toolkit';

import myTaskCount from './myTaskListSlice';

const reducer = combineReducers({
    myTaskCount,
});

export default reducer;