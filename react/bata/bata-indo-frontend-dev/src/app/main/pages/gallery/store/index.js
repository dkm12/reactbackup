import { combineReducers } from '@reduxjs/toolkit';
import galleryFolderView from './galleryFolderViewSlice';
import imageView from './imageViewsSlice';
const reducer = combineReducers({
	galleryFolderView,
	imageView
});

export default reducer;
