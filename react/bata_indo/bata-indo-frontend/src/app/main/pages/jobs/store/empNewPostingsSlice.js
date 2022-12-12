import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';

export const getJobsList = createAsyncThunk('jobs/empNewPostings/getNewPostings', async param => {
	let url = {}
	url.pageNo = param.pgNo
	url.pageSize = param.pgSize
	if(param.jbdTitle) url.jbdTitle = param.jbdTitle
	if(param.jbdDesigName && param.jbdDesigName.title) url.jbdDesigName = param.jbdDesigName.title
	if(param.jbdDeptName && param.jbdDeptName.title) url.jbdDeptName = param.jbdDeptName.title
	if(param.jbdLocName && param.jbdLocName.title) url.jbdLocName = param.jbdLocName.title
	if(param.jbdPubFrmDate) url.jbdPubFrmDate = param.jbdPubFrmDate
	if(param.jbdPubToDate) url.jbdPubToDate = param.jbdPubToDate;
	const response = await axios.post(api.jobs.ijpGetAll, url);
	// const data = [];
	// response.data.data.data.map((d) => (data.push({ id: d.jbdId, ...d })));
	const formData = [];
	let data = {};
	if ('data' in response && response.data != null) {
		response.data.data.data.map((d) => (formData.push({ id: d.jbdId, ...d })));
		data = { 'totalItems': response.data.data.totalItems, 'data': formData }
	}
	return data;
});

const empNewPostingsAdapter = createEntityAdapter({});

export const { selectAll: selectJobPostings, selectById: selectJobPostingsById } = empNewPostingsAdapter.getSelectors(
	state => state.jobs.empNewPostings
);

const empNewPostingsSlice = createSlice({
	name: 'jobs/empNewPostings',
	initialState: empNewPostingsAdapter.getInitialState({
		searchText: '',
		totalItems: 0
	}),
	reducers: {
		setSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getJobsList.fulfilled]: (state, action) => {
			state.totalItems = action.payload.totalItems !== null ? action.payload.totalItems : 0;
			empNewPostingsAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		},
	}
});

export const { setJobPostingsSearchText } = empNewPostingsSlice.actions;

export default empNewPostingsSlice.reducer;
