import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';

export const getApplicantsList = createAsyncThunk('applicants/empApplicantsList/getApplicantsList', async  param => {
	let url = {}
	url.pageNo = param.pgNo
	url.pageSize = param.pgSize
	if(param.jbdTitle) url.jbdTitle = param.jbdTitle
	if(param.fullname && param.fullname.title) url.fullname = param.fullname.title
	if(param.currentStatusName) url.currentStatusName = param.currentStatusName
	if(param.ijpCreatedOnFromDate) url.ijpCreatedOnFromDate = param.ijpCreatedOnFromDate
	if(param.ijpCreatedOnToDate) url.ijpCreatedOnToDate = param.ijpCreatedOnToDate
	const response = await axios.post(api.applicants.ijpTaskList, url);
	// const data = await response.data.data;
	console.log("hellooo",response.data.data)
	// const data = [];
	// response.data.data.data.map((d) => (data.push({ id: d.ijpRecrId, ...d })));
	const formData = [];
	let data = {};
	if ('data' in response.data && response.data.data != null) {
		response.data.data.data.map((d) => (formData.push({ id: d.ijpRecrId, ...d })));
		data = { 'totalItems': response.data.data.totalItems, 'data': formData }
	}
	return data;
});

const empNewApplicantsAdapter = createEntityAdapter({});

export const { selectAll: selectApplicants, selectById: selectApplicantsById } = empNewApplicantsAdapter.getSelectors(
	state => state.applicants.empApplicantsList
);

const empNewApplicantsSlice = createSlice({
	name: 'applicants/empApplicantsList',
	initialState: empNewApplicantsAdapter.getInitialState({
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
		[getApplicantsList.fulfilled]: (state, action) => {
			state.totalItems = action.payload.totalItems !== null ? action.payload.totalItems : 0;
			empNewApplicantsAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		},
	}
});

export const { setApplicantsSearchText } = empNewApplicantsSlice.actions;

export default empNewApplicantsSlice.reducer;
