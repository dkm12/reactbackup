import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';

export const getDocuments = createAsyncThunk(
	'documentLibrary/documentList/getDocumentList', async folderId => {
		const response = await axios.get(api.DocumentLibraryData.getFilesById + folderId);
		const data = [];
		console.log(response)
		response.data.data.map((d) => (data.push({ id: d.id, ...d })));
		return data;
	});

export const saveDocuments = createAsyncThunk('documentLibrary/documentList/saveDocuments', async (fileObj, thunkAPI) => {
	const formData = new FormData();
	formData.append('file',fileObj.file);
	formData.append('folderId',fileObj.folderId);
	formData.append('documentType',fileObj.documentType);
	formData.append('createdBy',fileObj.createdBy);
	const config = {
		headers: {
			'content-type': 'multipart/form-data'
		}
	}
	const response = await axios.post(api.DocumentLibraryData.uploadFiles, formData, config);
	const data = await response.data;
	console.log(data)
	return true;
});

const documentListAdapter = createEntityAdapter({});

export const { selectAll: selectDocuments, selectById: selectDocumentsById } = documentListAdapter.getSelectors(
	state => state.documentLibrary.documentList
);

const documentListSlice = createSlice({
	name: 'documentLibrary/documentList',
	initialState: documentListAdapter.getInitialState({
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
		[getDocuments.fulfilled]: documentListAdapter.setAll
	}
});

export const { setDocumentsSearchText } = documentListSlice.actions;

export default documentListSlice.reducer;