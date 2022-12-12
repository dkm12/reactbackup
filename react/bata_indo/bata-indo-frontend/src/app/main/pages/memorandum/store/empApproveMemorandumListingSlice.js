import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';

export const getApproveMemorandumListing = createAsyncThunk('memorandum/empApproveMemorandumListing/getEmpApproveMemorandumListing', async obj => {
	let params={
		"pageNo": obj.page,
		"pageSize": obj.rowsPerPage
	};
	if('mmTitle' in obj.filterData && obj.filterData.mmTitle !== "") params.mmTitle=obj.filterData.mmTitle;
	if('mmType' in obj.filterData && obj.filterData.mmType !== "") params.mmType=obj.filterData.mmType;
	if('createdBy' in obj.filterData && obj.filterData.createdBy !== "") params.createdBy=obj.filterData.createdBy;
	if('memoFromDate' in obj.filterData && obj.filterData.memoFromDate !== "") params.memoFromDate=obj.filterData.memoFromDate;
	if('memoToDate' in obj.filterData && obj.filterData.memoToDate !== "") params.memoToDate=obj.filterData.memoToDate;
	if('status' in obj.filterData && obj.filterData.status !== "") params.status=obj.filterData.status;

	if('mmRefNo' in obj.filterData && obj.filterData.mmRefNo !== "") params.mmRefNo=obj.filterData.mmRefNo;

	const response = await axios.post(api.memorandum.forApprovalList, params);
	// const data = await response.data.data;
	let data = {};
	if('data' in response && response.data != null)
	{
		data=response.data.data;
	}
	return data;
});

const empApproveMemorandumListingAdapter = createEntityAdapter({});

export const { selectAll: selectApproveMemorandumListing, selectById: selectApproveMemorandumListingById } = empApproveMemorandumListingAdapter.getSelectors(
	state => state.memorandum.empApproveMemorandumListing
);

const empApproveMemorandumListingSlice = createSlice({
	name: 'memorandum/empApproveMemorandumListing',
	initialState: empApproveMemorandumListingAdapter.getInitialState({
		searchText: '',
		totalRecords: 0
	}),
	reducers: {
		setApproveMemorandumListingSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getApproveMemorandumListing.fulfilled]: (state, action) => {
			state.totalRecords=action.payload.totalItems !== null ? action.payload.totalItems : 0;
			empApproveMemorandumListingAdapter.setAll(state,action.payload.data !== null ? action.payload.data :[]);
		}
	}
});

export const { setApproveMemorandumListingSearchText } = empApproveMemorandumListingSlice.actions;

export default empApproveMemorandumListingSlice.reducer;
