import { combineReducers } from '@reduxjs/toolkit';
import myAadhar from './userSlice';
import panUser from './panUser';

const reducer = combineReducers({
	myAadhar,
	panUser,
});

export default reducer;
