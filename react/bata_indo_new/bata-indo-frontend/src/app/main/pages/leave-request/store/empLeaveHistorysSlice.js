import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getLeaveHistorys = createAsyncThunk('leaveRequest/empLeaveHistorys/getEmpLeaveHistorys', async params => {
	const responseLR = await axios.get(api.leaveRequest.getById+params.leaveRequestId);
	const dataLR = await responseLR.data.data;
	let trxNo=dataLR.trxNo;
	const response = await axios.post(api.leaveRequest.getWorkflowHistory,
		{
			"trxNo":trxNo,
			"startWith":"0",
			"dataSize":"10",
			"sortBy":"activityStartDate"
		}
		);
	// const data = await response.data.data;
	const data = [];
	console.log("response.data.data",response.data);
	response.data.data.map((d) => (data.push({ id: d.id, ...d})));
	
	return data;
});

const empLeaveHistorysAdapter = createEntityAdapter({});

export const { selectAll: selectLeaveHistorys, selectById: selectLeaveHistorysById } = empLeaveHistorysAdapter.getSelectors(
	state => state.leaveRequest.empLeaveHistorys
);

const empLeaveHistorysSlice = createSlice({
	name: 'leaveRequest/empLeaveHistorys',
	initialState: empLeaveHistorysAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setLeaveHistorysSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getLeaveHistorys.fulfilled]: empLeaveHistorysAdapter.setAll
	}
});

export const { setLeaveHistorysSearchText } = empLeaveHistorysSlice.actions;

export default empLeaveHistorysSlice.reducer;
