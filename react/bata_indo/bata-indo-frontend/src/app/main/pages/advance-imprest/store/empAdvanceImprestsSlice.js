import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getAdvanceImprests = createAsyncThunk('advanceImprest/empAdvanceImprests/getEmpAdvanceImprests', async obj => {
	let params={
		"pageNo": obj.page,
		"pageSize": obj.rowsPerPage
	};
	if('claimFromDate' in obj.filterData && obj.filterData.claimFromDate !== "") params.claimFromDate=obj.filterData.claimFromDate;
	if('claimToDate' in obj.filterData && obj.filterData.claimToDate !== "") params.claimToDate=obj.filterData.claimToDate;
	if('fromAmount' in obj.filterData && obj.filterData.fromAmount !== "") params.fromAmount=obj.filterData.fromAmount;
	if('toAmount' in obj.filterData && obj.filterData.toAmount !== "") params.toAmount=obj.filterData.toAmount;
	if('status' in obj.filterData && obj.filterData.status !== "") params.status=obj.filterData.status;
	
	const response = await axios.post(api.advanceImprest.getCreatedBy,params);
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

const empAdvanceImprestsAdapter = createEntityAdapter({});

export const { selectAll: selectAdvanceImprests, selectById: selectAdvanceImprestsById } = empAdvanceImprestsAdapter.getSelectors(
	state => state.advanceImprest.empAdvanceImprests
);

const empAdvanceImprestsSlice = createSlice({
	name: 'advanceImprest/empAdvanceImprests',
	initialState: empAdvanceImprestsAdapter.getInitialState({
		searchText: '',
		totalRecords: 0
	}),
	reducers: {
		setAdvanceImprestsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getAdvanceImprests.fulfilled]: (state, action) => {
			state.totalRecords=action.payload.totalItems !== null ? action.payload.totalItems : 0;
			empAdvanceImprestsAdapter.setAll(state,action.payload.data !== null ? action.payload.data :[]);
		}
	}
});

export const { setAdvanceImprestsSearchText } = empAdvanceImprestsSlice.actions;

export default empAdvanceImprestsSlice.reducer;
