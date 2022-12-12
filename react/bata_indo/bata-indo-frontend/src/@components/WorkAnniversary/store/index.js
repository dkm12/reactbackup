import { combineReducers } from '@reduxjs/toolkit';

import workAnniv from './workAnnivSlice';
import birthDay from './birthdaySlice';

const reducer = combineReducers({
    birthDay,
    workAnniv,
});

export default reducer;