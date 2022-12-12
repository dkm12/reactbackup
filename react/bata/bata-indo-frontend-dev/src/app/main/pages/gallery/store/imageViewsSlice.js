import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';

export const getImages = createAsyncThunk(
	'gallery/imageView/getImageList', async uuid => {
		const response = await axios.get(api.GalleryData.getFilesById + uuid);
		const data = [];
		console.log(response)
		response.data.data.map((d) => (data.push({ id: d.id, ...d })));
		return data;
	});

export const saveImages = createAsyncThunk('gallery/imageView/saveImages', async (fileObj, thunkAPI) => {
	const formData = new FormData();
	formData.append('file',fileObj.file);
	formData.append('folderId',fileObj.folderId);
	formData.append('createdBy',fileObj.createdBy);
	formData.append('documentType',fileObj.documentType);
	const config = {
		headers: {
			'content-type': 'multipart/form-data'
		}
	}
	const response = await axios.post(api.document.galleryUploadDoc, formData, config);
	const data = await response.data;
	console.log(data)
	return true;
});

const galleryImageViewAdapter = createEntityAdapter({});

export const { selectAll: selectImages, selectById: selectImagesById } = galleryImageViewAdapter.getSelectors(
	state => state.gallery.imageView
);

const galleryImageViewSlice = createSlice({
	name: 'gallery/imageView',
	initialState: galleryImageViewAdapter.getInitialState({
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
		[getImages.fulfilled]: galleryImageViewAdapter.setAll
	}
});

export const { setImagesSearchText } = galleryImageViewSlice.actions;

export default galleryImageViewSlice.reducer;