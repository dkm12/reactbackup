import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getRefJobsList = createAsyncThunk('jobs/refEmpActivePostings/getRefActivePostings', async param => {
	let url = {}
	url.pageNo = param.pgNo
	url.pageSize = param.pgSize
	if (param.jbdTitle) url.jbdTitle = param.jbdTitle
	if (param.jbdDesigName && param.jbdDesigName.title) url.jbdDesigName = param.jbdDesigName.title
	if (param.jbdDeptName && param.jbdDeptName.title) url.jbdDeptName = param.jbdDeptName.title
	if (param.jbdLocName && param.jbdLocName.title) url.jbdLocName = param.jbdLocName.title
	if (param.jbdPubFrmDate) url.jbdPubFrmDate = param.jbdPubFrmDate
	if (param.jbdPubToDate) url.jbdPubToDate = param.jbdPubToDate
	const response = await axios.post(api.applicants.getAllActiveJob, url);
	const formData = [];
	let data = {};
	if ('data' in response.data && response.data.data != null) {
		response.data.data.data.map((d) => (formData.push({ id: d.jbdId, ...d })));
		data = { 'totalItems': response.data.data.totalItems, 'data': formData }
	}
	console.log(data)
	return data;
});

const refEmpActivePostingsAdapter = createEntityAdapter({});

export const { selectAll: selectRefJobPostings, selectById: selectRefJobPostingsById } = refEmpActivePostingsAdapter.getSelectors(
	state => state.jobs.refEmpActivePostings
);

const refEmpActivePostingsSlice = createSlice({
	name: 'jobs/refEmpActivePostings',
	initialState: refEmpActivePostingsAdapter.getInitialState({
		searchText: '',
		totalRecords: 0
	}),
	reducers: {
		setJobPostingsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getRefJobsList.fulfilled]: (state, action) => {
			state.totalRecords = action.payload.totalItems !== null ? action.payload.totalItems : 0;
			refEmpActivePostingsAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		}
	}
});

export const { setJobPostingsSearchText } = refEmpActivePostingsSlice.actions;

export default refEmpActivePostingsSlice.reducer;