import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';

export const getApproveClaims = createAsyncThunk('advanceImprest/empApproveClaims/getEmpApproveClaims', async obj => {
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
	

	const response = await axios.post(api.advanceImprest.forApprovalList,params);
	// const data = await response.data.data;
	// const data = [];
	// _.isArray(response.data.data) && response.data.data.map((d) => (data.push({ id: d.id, ...d })));

	let data = {};
	if('data' in response && response.data != null)
	{
		data=response.data.data;
	}
	
	return data;
});

const empApproveClaimsAdapter = createEntityAdapter({});

export const { selectAll: selectApproveClaims, selectById: selectApproveClaimsById } = empApproveClaimsAdapter.getSelectors(
	state => state.advanceImprest.empApproveClaims
);

const empApproveClaimsSlice = createSlice({
	name: 'advanceImprest/empApproveClaims',
	initialState: empApproveClaimsAdapter.getInitialState({
		searchText: '',
		totalRecords: 0
	}),
	reducers: {
		setApproveClaimsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getApproveClaims.fulfilled]: (state, action) => {
			state.totalRecords=action.payload.totalItems !== null ? action.payload.totalItems : 0;
			empApproveClaimsAdapter.setAll(state,action.payload.data !== null ? action.payload.data :[]);
		}
	}
});

export const { setApproveClaimsSearchText } = empApproveClaimsSlice.actions;

export default empApproveClaimsSlice.reducer;
