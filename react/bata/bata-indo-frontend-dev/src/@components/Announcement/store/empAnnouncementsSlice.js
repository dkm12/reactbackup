import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getAnnouncementList = createAsyncThunk('announcement/empAnnouncement/getAnnouncementList', async param => {
	let postData = {}
	postData.pageNo = param.pgNo
	postData.pageSize = param.pgSize
	if (param.annTitle) postData.annTitle = param.annTitle
	if (param.annPublishTillDateFrom) postData.annPublishTillDateFrom = param.annPublishTillDateFrom
	if (param.annStatus) postData.annStatus = param.annStatus
	if (param.annPublishTillDateTo) postData.annPublishTillDateTo = param.annPublishTillDateTo
	const response = await axios.post(api.announcement.getAll, postData);


	const formData = [];
	let data = {};
	console.log("response>>>>", response)
	if ('data' in response.data && response.data.data != null) {
		response.data.data.data.map((d) => (formData.push({ id: d.annId, ...d })));
		data = { 'totalItems': response.data.data.totalItems, 'data': formData }
	} else {
		data = { 'totalItems': 0, 'data': [] }
	}
	console.log(data)
	// return data;
	// const data = {
	// 	totalRecords: 0,
	// 	data: []
	// };
	// if (response.data) {
	// 	response.data.data.data.map((d) => (data.data.push({ id: d.annId, ...d })));
	// 	data.totalRecords = response.data.data.totalItems;

	// }

	return data;
});

export const getAnnouncementListForUser = createAsyncThunk('announcement/empAnnouncement/getAnnouncementListForUser', async param => {
	let postData = {}
	postData.pageNo = param.pgNo
	postData.pageSize = param.pgSize
	if (param.annTitle) postData.annTitle = param.annTitle
	if (param.annPublishDate) postData.annPublishDate = param.annPublishDate
	if (param.annPublishTillDate) postData.annPublishTillDate = param.annPublishTillDate
	const response = await axios.post(api.announcement.getAllActiveAnn, postData);
	const formData = [];
	let data = {};
	console.log("response>>>>", response)
	if ('data' in response.data && response.data.data != null) {
		response.data.data.data.map((d) => (formData.push({ id: d.annId, ...d })));
		data = { 'totalItems': response.data.data.totalItems, 'data': formData }
	} else {
		data = { 'totalItems': 0, 'data': [] }
	}
	console.log(data)
	return data;
	// const data = [];
	// response.data.data.data.map((d) => (data.push({ id: d.annId, ...d })));
	// console.log("data", data);
	// return data;
});

const empNewAnnouncementAdapter = createEntityAdapter({});

export const { selectAll: selectAnnouncements, selectById: selectAnnouncementById } = empNewAnnouncementAdapter.getSelectors(
	state => state.announcement.announcementsList
);

const AnnouncementListSlice = createSlice({
	name: 'announcement/announcementsList',
	initialState: empNewAnnouncementAdapter.getInitialState({
		searchText: '',
		totalRecords: 0
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
		[getAnnouncementList.fulfilled]: (state, action) => {
			state.totalRecords = action.payload.totalItems !== null ? action.payload.totalItems : 0;
			empNewAnnouncementAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		},
		[getAnnouncementListForUser.fulfilled]: (state, action) => {
			state.totalRecords = action.payload.totalItems !== null ? action.payload.totalItems : 0;
			empNewAnnouncementAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		}
	}
	// empNewAnnouncementAdapter.setAll
});

export const { setAnnouncementSearchText } = AnnouncementListSlice.actions;

export default AnnouncementListSlice.reducer;
