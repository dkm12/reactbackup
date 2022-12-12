import { combineReducers } from '@reduxjs/toolkit';

import NewJoineeList from './empNewJoineesSlice';

const reducer = combineReducers({
    NewJoineeList,
});

export default reducer;