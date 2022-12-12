import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getApproveLeavesHR = createAsyncThunk('approveLeave/empApproveLeavesHR/getEmpApproveLeavesHR', async obj => {
	let params={
		"pageNo": obj.page,
		"pageSize": obj.rowsPerPage
	};
	if('leaveType' in obj.filterData && obj.filterData.leaveType !== "") params.leaveType=obj.filterData.leaveType;
	if('createdBy' in obj.filterData && obj.filterData.createdBy !== ""&& obj.filterData.createdBy !== null) params.createdBy=obj.filterData.createdBy.value;
	if('leaveSubmittedFrom' in obj.filterData && obj.filterData.leaveSubmittedFrom !== "") params.leaveSubmittedFrom=obj.filterData.leaveSubmittedFrom;
	if('leaveSubmittedTo' in obj.filterData && obj.filterData.leaveSubmittedTo !== "") params.leaveSubmittedTo=obj.filterData.leaveSubmittedTo;
	if('status' in obj.filterData && obj.filterData.status !== "") params.status=obj.filterData.status;
	let response = await axios.post(api.leaveRequest.forHr, params)
	// const data = aaawait response.data.data;
	let data = {};  
    console.log(response)
	if(response.data && response.data.data)
	{
		data=response.data.data;
	}
    else {
        data.totalItems = 0
        data.data = []
    }

	return data;
});

const empApproveLeavesHRAdapter = createEntityAdapter({});

export const { selectAll: selectApproveLeaves, selectById: selectApproveLeavesById } = empApproveLeavesHRAdapter.getSelectors(
	state => state.approveLeave.empApproveLeavesHR
);

const empApproveLeavesHRSlice = createSlice({
	name: 'approveLeave/empApproveLeavesHR',
	initialState: empApproveLeavesHRAdapter.getInitialState({
		searchText: '',
		totalRecords: 0
	}),
	reducers: {
		setApproveLeavesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getApproveLeavesHR.fulfilled]: (state, action) => {
			state.totalRecords=action.payload.totalItems !== null ? action.payload.totalItems : 0;
			empApproveLeavesHRAdapter.setAll(state,action.payload.data !== null ? action.payload.data :[]);
		}
	}
});

export const { setApproveLeavesSearchText } = empApproveLeavesHRSlice.actions;

export default empApproveLeavesHRSlice.reducer;
