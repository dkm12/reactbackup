import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';

export const getActiveJobsList = createAsyncThunk('jobs/empCurrentVacancies/getActiveJobsList', async param => {
	let url = {}
	url.pageNo = param.pgNo
	url.pageSize = param.pgSize
	if(param.jbdTitle) url.jbdTitle = param.jbdTitle
	if(param.jbdDesigName && param.jbdDesigName.title) url.jbdDesigName = param.jbdDesigName.title
	if(param.jbdDeptName && param.jbdDeptName.title) url.jbdDeptName = param.jbdDeptName.title
	if(param.jbdLocName && param.jbdLocName.title) url.jbdLocName = param.jbdLocName.title
	if(param.jbdPubFrmDate) url.jbdPubFrmDate = param.jbdPubFrmDate
	if(param.jbdPubToDate) url.jbdPubToDate = param.jbdPubToDate;
	const response = await axios.post(api.jobs.ijpGetAllActiveJobs, url);
	// const data = await response.data.data;
	// const data = [];
	// response.data.data.map((d) => (data.push({ id: d.jbdId, ...d })));

	const formData = [];
	let data = {};
	if ('data' in response && response.data != null) {
		response.data.data.data.map((d) => (formData.push({ id: d.jbdId, ...d })));
		data = { 'totalItems': response.data.data.totalItems, 'data': formData }
	}
	console.log(data)
	return data;
});

const empInternalJobsAdapter = createEntityAdapter({});

export const { selectAll: selectInternalJobPostings, selectById: selectJobPostingsById } = empInternalJobsAdapter.getSelectors(
	state => state.jobs.empCurrentVacancies
);


const empInternalJobsSlice = createSlice({
	name: 'jobs/empCurrentVacancies',
	initialState: empInternalJobsAdapter.getInitialState({
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
		[getActiveJobsList.fulfilled]: (state, action) => {
			state.totalItems = action.payload.totalItems !== null ? action.payload.totalItems : 0;
			empInternalJobsAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		}
	}
});

export const { setJobPostingsSearchText } = empInternalJobsSlice.actions;

export default empInternalJobsSlice.reducer;
