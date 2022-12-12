import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getAppliedTrainingList = createAsyncThunk('training/empAppliedTrainingList/getEmpAppliedTrainingList', async obj => {
	let params={
		"pageNo": obj.page,
		"pageSize": obj.rowsPerPage
	};
	if('trngName' in obj.filterData && obj.filterData.trngName !== "") params.trngName=obj.filterData.trngName;
	if('transactionNumber' in obj.filterData && obj.filterData.transactionNumber !== "") params.transactionNumber=obj.filterData.transactionNumber;
	if('appliedByName' in obj.filterData && obj.filterData.appliedByName !== "") params.appliedByName=obj.filterData.appliedByName;
	if('appliedOnFromDate' in obj.filterData && obj.filterData.appliedOnFromDate !== "") params.appliedOnFromDate=obj.filterData.appliedOnFromDate;
	if('appliedOnToDate' in obj.filterData && obj.filterData.appliedOnToDate !== "") params.appliedOnToDate=obj.filterData.appliedOnToDate;
	if('statusName' in obj.filterData && obj.filterData.statusName !== "") params.statusName=obj.filterData.statusName;


	const response = await axios.post(api.training.appliedTrainingApplication,params);
	// const data = await response.data.data;
	// const data = [];
	// response.data.data.map((d) => (data.push({ id: d.id, ...d })));
	let data = {};
	if ('data' in response && response.data != null) {
		data = response.data;
	}

	return data;
});

const empAppliedTrainingListAdapter = createEntityAdapter({});

export const { selectAll: selectAppliedTrainingList, selectById: selectAppliedTrainingListById } = empAppliedTrainingListAdapter.getSelectors(
	state => state.training.empAppliedTrainingList
);

const empAppliedTrainingListSlice = createSlice({
	name: 'training/empAppliedTrainingList',
	initialState: empAppliedTrainingListAdapter.getInitialState({
		searchText: '',
		totalRecords: 0
	}),
	reducers: {
		setAppliedTrainingListSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getAppliedTrainingList.fulfilled]: (state, action) => {
			console.log("action.payload",action.payload);
			state.totalRecords = action.payload.data.totalItems !== null ? action.payload.data.totalItems : 0;
			const dataObj = [];
			action.payload.data.data !== null && action.payload.data.data.map((d) => (dataObj.push({ id: d.trngId, ...d })));
			
			empAppliedTrainingListAdapter.setAll(state, action.payload.data.data !== null ? dataObj : []);
		}
	}
});

export const { setAppliedTrainingListSearchText } = empAppliedTrainingListSlice.actions;

export default empAppliedTrainingListSlice.reducer;
