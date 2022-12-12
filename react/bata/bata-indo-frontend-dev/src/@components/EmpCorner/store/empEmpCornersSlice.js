import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getEmpCornerList = createAsyncThunk('empCorner/empEmpCorner/getEmpCornerList', async param => {
	let postData = {}
	postData.pageNo = param.pgNo
	postData.pageSize = param.pgSize
	if (param.topicTitle) postData.topicTitle = param.topicTitle
	if (param.topicDesc) postData.topicDesc = param.topicDesc
	// if (param.createdByEmpCode) postData.createdByEmpCode = param.createdByEmpCode
	if (param.createdByEmpCode && param.createdByEmpCode.value) postData.createdByEmpCode = param.createdByEmpCode.value
	if (param.createdOnFromDate) postData.createdOnFromDate = param.createdOnFromDate
	if (param.createdOnToDate) postData.createdOnToDate = param.createdOnToDate

	const response = await axios.post(api.empCorner.getAllTopics, postData);


	const formData = [];
	let data = {};
	console.log("response>>>>", response)
	if ('data' in response.data && response.data.data != null) {
		response.data.data.data.map((d) => (formData.push({ id: d.topicId, ...d })));
		data = { 'totalItems': response.data.data.totalItems, 'data': formData }
	} else {
		data = { 'totalItems': 0, 'data': [] }
	}
	console.log(data)

	// const data = [];
	// response.data.data.data.map((d) => (data.push({ id: d.topicId, ...d })));
	return data;
});

const empNewEmpCornerAdapter = createEntityAdapter({});

export const { selectAll: selectEmpCorners, selectById: selectEmpCornerById } = empNewEmpCornerAdapter.getSelectors(
	state => state.empCorner.empCornersList
);

const EmpCornerListSlice = createSlice({
	name: 'empCorner/empCornersList',
	initialState: empNewEmpCornerAdapter.getInitialState({
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
		[getEmpCornerList.fulfilled]: (state, action) => {
			state.totalRecords = action.payload.totalItems !== null ? action.payload.totalItems : 0;
			empNewEmpCornerAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		},

		// empNewEmpCornerAdapter.setAll
	}
});

export const { setEmpCornerSearchText } = EmpCornerListSlice.actions;

export default EmpCornerListSlice.reducer;
