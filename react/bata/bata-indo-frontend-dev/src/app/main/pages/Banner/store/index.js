import { combineReducers } from '@reduxjs/toolkit';

import bannerSave from './bannerSaveSlice';
import bannerList from './bannerListSlice';

const reducer = combineReducers({
    bannerSave,
    bannerList

});

export default reducer;