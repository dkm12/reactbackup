import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import history from '@history';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';

export const getNewAnnouncement = createAsyncThunk('announcement/announcementForm/getNewAnnouncement', async annid => {
	//console.log("params",params);
	const response = await axios.get(api.announcement.getById + '/' + annid);
	const data = await response.data.data;
	console.log('datadddddddd :>> ', data);
	// const data = [];
	// data[0]=response.data.data;
	return data;
});

export const saveNewAnnouncement = createAsyncThunk('announcement/announcementForm/saveNewAnnouncement', async (params, thunkAPI) => {
	thunkAPI.dispatch(showSplash({ state: true }));
	let response;
	if (params.type == 'save') {
		response = await axios.post(api.announcement.save, params.data);
	} else if (params.type == 'update') {
		response = await axios.put(api.announcement.update + '/' + params.data.annId, params.data);
	}
	else if (params.type == 'publish') {
		await axios.put(api.announcement.update + '/' + params.data.annId, params.data);
		response = await axios.put(api.announcement.updateStatus + '/' + params.data.annId, { "annStatus": "open" })
	}
	const data = await response.data;

	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		if (data.message == "Added Successfully") {
			history.push({
				pathname: '/app/announcement/adminList'
			});
		} else {
			history.push({
				pathname: '/app/announcement/list/announcementList'
			});
		}
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data.data;
});
export const updateAnnouncement = createAsyncThunk('announcement/empAnnouncement/updateAnnouncement', async (updateAnnouncementParams, thunkAPI) => {
	console.log("hello");
	thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.put(api.announcement.update, updateAnnouncementParams);
	const data = await response.data;

	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data;
});



const announcementFormSlice = createSlice({
	name: 'announcement/announcementForm',
	initialState: null,
	reducers: {
		newAnnouncementRequest: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: null,
					annTitle: "",
					annDesc: "",
					annAttachId: "",
					annPublishTillDate: "",
				}
			})
		}
	},
	extraReducers: {
		[getNewAnnouncement.fulfilled]: (state, action) => action.payload,
		[saveNewAnnouncement.fulfilled]: (state, action) => action.payload
	}
});

export const { newAnnouncementRequest } = announcementFormSlice.actions;

export default announcementFormSlice.reducer;
