import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getCashReimbursementCashiers = createAsyncThunk('cashReimbursement/empCashReimbursementCashiers/getEmpCashReimbursementCashiers', async obj => {
	let params={
		"pageNo": obj.page,
		"pageSize": obj.rowsPerPage
	};
	if('claimFromDate' in obj.filterData && obj.filterData.claimFromDate !== "") params.claimFromDate=obj.filterData.claimFromDate;
	if('claimToDate' in obj.filterData && obj.filterData.claimToDate !== "") params.claimToDate=obj.filterData.claimToDate;
	if('fromAmount' in obj.filterData && obj.filterData.fromAmount !== "") params.fromAmount=obj.filterData.fromAmount;
	if('toAmount' in obj.filterData && obj.filterData.toAmount !== "") params.toAmount=obj.filterData.toAmount;
	if('status' in obj.filterData && obj.filterData.status !== "") params.status=obj.filterData.status;
	if('createdBy' in obj.filterData && obj.filterData.createdBy !== ""&& obj.filterData.createdBy !== null) params.createdBy=obj.filterData.createdBy.value;
	
	const response = await axios.post(api.cashReimbursement.forCashierList,params);
	// const data = await response.data.data;
	// const data = [];
	// response.data.data.map((d) => (data.push({ id: d.id, ...d })));
	let data = {};
	if('data' in response.data && response.data.data != null)
	{
		data=response.data.data;
	}
	else{
		data.data = []
		data.totalItems = 0
	}
	
	return data;
});

const empCashReimbursementCashiersAdapter = createEntityAdapter({});

export const { selectAll: selectCashReimbursementCashiers, selectById: selectCashReimbursementCashiersById } = empCashReimbursementCashiersAdapter.getSelectors(
	state => state.cashReimbursement.empCashReimbursementCashiers
);

const empCashReimbursementCashiersSlice = createSlice({
	name: 'cashReimbursement/empCashReimbursementCashiers',
	initialState: empCashReimbursementCashiersAdapter.getInitialState({
		searchText: '',
		totalRecords: 0
	}),
	reducers: {
		setCashReimbursementCashiersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getCashReimbursementCashiers.fulfilled]: (state, action) => {
			state.totalRecords=action.payload.totalItems !== null ? action.payload.totalItems : 0;
			empCashReimbursementCashiersAdapter.setAll(state,action.payload.data !== null ? action.payload.data :[]);
		}
	}
});

export const { setCashReimbursementCashiersSearchText } = empCashReimbursementCashiersSlice.actions;

export default empCashReimbursementCashiersSlice.reducer;
