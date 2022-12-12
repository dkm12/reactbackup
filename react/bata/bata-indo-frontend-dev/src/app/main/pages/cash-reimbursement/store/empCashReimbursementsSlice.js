import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getCashReimbursements = createAsyncThunk('cashReimbursement/empCashReimbursements/getEmpCashReimbursements', async obj => {
	let params={
		"pageNo": obj.page,
		"pageSize": obj.rowsPerPage
	};
	if('claimFromDate' in obj.filterData && obj.filterData.claimFromDate !== "") params.claimFromDate=obj.filterData.claimFromDate;
	if('claimToDate' in obj.filterData && obj.filterData.claimToDate !== "") params.claimToDate=obj.filterData.claimToDate;
	if('fromAmount' in obj.filterData && obj.filterData.fromAmount !== "") params.fromAmount=obj.filterData.fromAmount;
	if('toAmount' in obj.filterData && obj.filterData.toAmount !== "") params.toAmount=obj.filterData.toAmount;
	if('status' in obj.filterData && obj.filterData.status !== "") params.status=obj.filterData.status;
	

	const response = await axios.post(api.cashReimbursement.getCreatedBy,params);
	// const data = await response.data.data;
	// const data = [];
	// response.data.data.map((d) => (data.push({ id: d.id, ...d })));
	let data = {};
	if('data' in response && response.data != null)
	{
		data=response.data.data;
	}

	return data;
});

const empCashReimbursementsAdapter = createEntityAdapter({});

export const { selectAll: selectCashReimbursements, selectById: selectCashReimbursementsById } = empCashReimbursementsAdapter.getSelectors(
	state => state.cashReimbursement.empCashReimbursements
);

const empCashReimbursementsSlice = createSlice({
	name: 'cashReimbursement/empCashReimbursements',
	initialState: empCashReimbursementsAdapter.getInitialState({
		searchText: '',
		totalRecords: 0
	}),
	reducers: {
		setCashReimbursementsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getCashReimbursements.fulfilled]: (state, action) => {
			state.totalRecords=action.payload.totalItems !== null ? action.payload.totalItems : 0;
			empCashReimbursementsAdapter.setAll(state,action.payload.data !== null ? action.payload.data :[]);
		}
	}
});

export const { setCashReimbursementsSearchText } = empCashReimbursementsSlice.actions;

export default empCashReimbursementsSlice.reducer;
