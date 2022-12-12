import { combineReducers } from '@reduxjs/toolkit';
import login from './loginSlice';
import register from './registerSlice';
import user from './userSlice';
import myProfile from './myProfileSlice';

const authReducers = combineReducers({
	user,
	login,
	register,
	myProfile
});

export default authReducers;
