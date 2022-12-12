import { combineReducers } from '@reduxjs/toolkit';
import documentFolderView from './documentFolderViewSlice';
import documentList from './documentListsSlice';
const reducer = combineReducers({
	documentFolderView,
	documentList
});

export default reducer;
