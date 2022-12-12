import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getApproveLeaves = createAsyncThunk('approveLeave/empApproveLeaves/getEmpApproveLeaves', async obj => {
	let params={
		"pageNo": obj.page,
		"pageSize": obj.rowsPerPage
	};
	if('leaveType' in obj.filterData && obj.filterData.leaveType !== "") params.leaveType=obj.filterData.leaveType;
	if('createdBy' in obj.filterData && obj.filterData.createdBy !== "") params.createdBy=obj.filterData.createdBy;
	if('leaveSubmittedFrom' in obj.filterData && obj.filterData.leaveSubmittedFrom !== "") params.leaveSubmittedFrom=obj.filterData.leaveSubmittedFrom;
	if('leaveSubmittedTo' in obj.filterData && obj.filterData.leaveSubmittedTo !== "") params.leaveSubmittedTo=obj.filterData.leaveSubmittedTo;
	if('status' in obj.filterData && obj.filterData.status !== "") params.status=obj.filterData.status;

	const response = await axios.post(api.leaveRequest.forApprovalList, params);
	// const data = await response.data.data;
	let data = {};
	if('data' in response && response.data != null)
	{
		data=response.data.data;
	}

	return data;
});

const empApproveLeavesAdapter = createEntityAdapter({});

export const { selectAll: selectApproveLeaves, selectById: selectApproveLeavesById } = empApproveLeavesAdapter.getSelectors(
	state => state.approveLeave.empApproveLeaves
);

const empApproveLeavesSlice = createSlice({
	name: 'approveLeave/empApproveLeaves',
	initialState: empApproveLeavesAdapter.getInitialState({
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
		[getApproveLeaves.fulfilled]: (state, action) => {
			state.totalRecords=action.payload.totalItems !== null ? action.payload.totalItems : 0;
			empApproveLeavesAdapter.setAll(state,action.payload.data !== null ? action.payload.data :[]);
		}
	}
});

export const { setApproveLeavesSearchText } = empApproveLeavesSlice.actions;

export default empApproveLeavesSlice.reducer;
