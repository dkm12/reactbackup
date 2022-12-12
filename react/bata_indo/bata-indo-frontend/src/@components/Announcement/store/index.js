import { combineReducers } from '@reduxjs/toolkit';

import announcementsList from './empAnnouncementsSlice';
import announcementForm from './announcementFormSlice';

const reducer = combineReducers({
    announcementsList,
    announcementForm,

});

export default reducer;