import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getLeaveRequests = createAsyncThunk('leaveRequest/empLeaveRequests/getEmpLeaveRequests', async obj => {
	let params={
		"pageNo": obj.page,
		"pageSize": obj.rowsPerPage
	};
	if('leaveType' in obj.filterData && obj.filterData.leaveType !== "") params.leaveType=obj.filterData.leaveType;
	if('createdBy' in obj.filterData && obj.filterData.createdBy !== "") params.createdBy=obj.filterData.createdBy;
	if('leaveSubmittedFrom' in obj.filterData && obj.filterData.leaveSubmittedFrom !== "") params.leaveSubmittedFrom=obj.filterData.leaveSubmittedFrom;
	if('leaveSubmittedTo' in obj.filterData && obj.filterData.leaveSubmittedTo !== "") params.leaveSubmittedTo=obj.filterData.leaveSubmittedTo;
	if('status' in obj.filterData && obj.filterData.status !== "") params.status=obj.filterData.status;

	const response = await axios.post(api.leaveRequest.getCreatedBy,params);
	// const data = await response.data.data;
	let data = {};
	if('data' in response && response.data != null)
	{
		data=response.data.data;
	}
	//response.data.data.map((d) => (data.push({ id: d.id, ...d })));
	//state.totalSize=10;
	return data;
});

const empLeaveRequestsAdapter = createEntityAdapter({});

export const { selectAll: selectLeaveRequests, selectById: selectLeaveRequestsById } = empLeaveRequestsAdapter.getSelectors(
	state => state.leaveRequest.empLeaveRequests
);

const empLeaveRequestsSlice = createSlice({
	name: 'leaveRequest/empLeaveRequests',
	initialState: empLeaveRequestsAdapter.getInitialState({
		searchText: '',
		totalRecords: 0
	}),
	reducers: {
		setLeaveRequestsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getLeaveRequests.fulfilled]: (state, action) => {
			state.totalRecords=action.payload.totalItems !== null ? action.payload.totalItems : 0;
			empLeaveRequestsAdapter.setAll(state,action.payload.data !== null ? action.payload.data :[]);
		}
	}
});

export const { setLeaveRequestsSearchText } = empLeaveRequestsSlice.actions;

export default empLeaveRequestsSlice.reducer;
