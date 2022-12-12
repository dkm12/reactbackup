import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';

export const getConsentMemorandumListing = createAsyncThunk('memorandum/empConsentMemorandumListing/getEmpConsentMemorandumListing', async obj => {
	let params={
		"pageNo": obj.page,
		"pageSize": obj.rowsPerPage
	};
	if('mmTitle' in obj.filterData && obj.filterData.mmTitle !== "") params.mmTitle=obj.filterData.mmTitle;
	if('mmType' in obj.filterData && obj.filterData.mmType !== "") params.mmType=obj.filterData.mmType;
	if('createdBy' in obj.filterData && obj.filterData.createdBy !== ""&& obj.filterData.createdBy !== null) params.createdBy=obj.filterData.createdBy.value;
	if('memoFromDate' in obj.filterData && obj.filterData.memoFromDate !== "") params.memoFromDate=obj.filterData.memoFromDate;
	if('memoToDate' in obj.filterData && obj.filterData.memoToDate !== "") params.memoToDate=obj.filterData.memoToDate;
	if('status' in obj.filterData && obj.filterData.status !== "") params.status=obj.filterData.status;

	const response = await axios.post(api.memorandum.forConsentApprovalList , params);
	// const data = await response.data.data;
	let data = {};
	if('data' in response && response.data != null)
	{
		data=response.data.data;
	}
	return data;
});

const empConsentMemorandumListingAdapter = createEntityAdapter({});

export const { selectAll: selectConsentMemorandumListing, selectById: selectConsentMemorandumListingById } = empConsentMemorandumListingAdapter.getSelectors(
	state => state.memorandum.empConsentMemorandumListing
);

const empConsentMemorandumListingSlice = createSlice({
	name: 'memorandum/empConsentMemorandumListing',
	initialState: empConsentMemorandumListingAdapter.getInitialState({
		searchText: '',
		totalRecords: 0
	}),
	reducers: {
		setConsentMemorandumListingSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getConsentMemorandumListing.fulfilled]: (state, action) => {
			state.totalRecords=action.payload.totalItems !== null ? action.payload.totalItems : 0;
			empConsentMemorandumListingAdapter.setAll(state,action.payload.data !== null ? action.payload.data :[]);
		}
	}
});

export const { setConsentMemorandumListingSearchText } = empConsentMemorandumListingSlice.actions;

export default empConsentMemorandumListingSlice.reducer;
