import { combineReducers } from '@reduxjs/toolkit';

import empNotification from './empNotificationSlice';


const reducer = combineReducers({
    empNotification
});

export default reducer;