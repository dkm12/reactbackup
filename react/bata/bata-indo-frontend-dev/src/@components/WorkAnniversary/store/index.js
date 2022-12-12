import { combineReducers } from '@reduxjs/toolkit';

import workAnniv from './workAnnivSlice';
import birthDay from './birthdaySlice';
import workWishes from './workWishes';
import birthdayWishes from './birthdayWishesSlice ';

const reducer = combineReducers({
    birthDay,
    workAnniv,
    workWishes,
    birthdayWishes
});

export default reducer;