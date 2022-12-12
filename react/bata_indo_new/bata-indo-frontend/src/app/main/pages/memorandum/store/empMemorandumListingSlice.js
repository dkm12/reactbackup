import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getMemorandums = createAsyncThunk('memorandum/empMemorandumListing/getEmpMemorandums', async obj => {
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

	if('mmRefNo' in obj.filterData && obj.filterData.mmRefNo !== "") params.mmRefNo=obj.filterData.mmRefNo;


	const response = await axios.post(api.memorandum.getCreatedBy , params);
	// const data = await response.data.data;
	let data = {};
	if('data' in response && response.data != null)
	{
		data=response.data.data;
	}
	return data;
});

const empMemorandumListingAdapter = createEntityAdapter({});

export const { selectAll: selectMemorandums, selectById: selectMemorandumsById } = empMemorandumListingAdapter.getSelectors(
	state => state.memorandum.empMemorandumListing
);

const empMemorandumListingSlice = createSlice({
	name: 'memorandum/empMemorandumListing',
	initialState: empMemorandumListingAdapter.getInitialState({
		searchText: '',
		totalRecords: 0
	}),
	reducers: {
		setMemorandumsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getMemorandums.fulfilled]: (state, action) => {
			state.totalRecords=action.payload.totalItems !== null ? action.payload.totalItems : 0;
			empMemorandumListingAdapter.setAll(state,action.payload.data !== null ? action.payload.data :[]);
		}
	}
});

export const { setMemorandumsSearchText } = empMemorandumListingSlice.actions;

export default empMemorandumListingSlice.reducer;
