import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';

export const getDocumentFolders = createAsyncThunk(
  'documentLibrary/documenFolderView/getDocumentLibraryFolderView',
  async () => {
	const response = await axios.get(api.DocumentLibraryData.getallFolder);
	const data = [];
  response.data.data.map((d) => (data.push({ id: d.id, ...d })));
	return data;
});


export const saveFolderName = createAsyncThunk('documentLibrary/documenFolderView/saveFolderName', async (folderRequest,thunkAPI) => {
	// thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.post(api.DocumentLibraryData.createFolder, folderRequest);
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

const documentFolderViewAdapter = createEntityAdapter({});

export const { selectAll: selectDocumentFolders, selectById: selectDocumentFolderById } = documentFolderViewAdapter.getSelectors(
	state => state.documentLibrary.documentFolderView
);

const documentFolderViewSlice = createSlice({
	name: 'documentLibrary/documenFolderView',
	initialState: documentFolderViewAdapter.getInitialState({
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
		[getDocumentFolders.fulfilled]: documentFolderViewAdapter.setAll
	}
});

export const { setDocumentFolderSearchText } = documentFolderViewSlice.actions;

export default documentFolderViewSlice.reducer;
