import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';

export const getGallery = createAsyncThunk(
  'gallery/galleryFolderView/getGalleryFolderView', async url => {
	const response = await axios.get(api.GalleryData.getallFolder+url);
	const data = [];
  response.data.data.map((d) => (data.push({ id: d.id, ...d })));
	return data;
});


export const saveFolderName = createAsyncThunk('gallery/galleryFolderView/saveFolderName', async (folderRequest,thunkAPI) => {
	// thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.post(api.GalleryData.createFolder, folderRequest);
	const data = await response.data;
  console.log(data)

	// if (response) {
	// 	thunkAPI.dispatch(hideSplash({ state: false }));
	// }

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		// thunkAPI.dispatch(push('/app/hr-service/leave-requests'));
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}

	return data;
});

const galleryFolderViewAdapter = createEntityAdapter({});

export const { selectAll: selectGallery, selectById: selectGalleryById } = galleryFolderViewAdapter.getSelectors(
	state => state.gallery.galleryFolderView
);

const galleryFolderViewSlice = createSlice({
	name: 'gallery/galleryFolderView',
	initialState: galleryFolderViewAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setProductsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getGallery.fulfilled]: galleryFolderViewAdapter.setAll
	}
});

export const { setGallerySearchText } = galleryFolderViewSlice.actions;

export default galleryFolderViewSlice.reducer;
