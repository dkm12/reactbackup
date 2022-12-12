import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';

export const getTrainingApplicationListing = createAsyncThunk('training/empTrainingApplicationListing/getEmpTrainingApplicationListing', async obj => {
	
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


	const response = await axios.post(api.training.viewAll,params);
	// const data = await response.data.data;
	// const data = [];
	// _.isArray(response.data.data) && response.data.data.map((d) => (data.push({ id: d.id, ...d })));

	let data = {};
	if ('data' in response && response.data != null) {
		data = response.data;
	}

	return data;
});

const empTrainingApplicationListingAdapter = createEntityAdapter({});

export const { selectAll: selectTrainingApplicationListing, selectById: selectTrainingApplicationListingById } = empTrainingApplicationListingAdapter.getSelectors(
	state => state.training.empTrainingApplicationListing
);

const empTrainingApplicationListingSlice = createSlice({
	name: 'training/empTrainingApplicationListing',
	initialState: empTrainingApplicationListingAdapter.getInitialState({
		searchText: '',
		totalRecords: 0
	}),
	reducers: {
		setTrainingApplicationListingSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getTrainingApplicationListing.fulfilled]: (state, action) => {
			state.totalRecords = action.payload.data.totalItems !== null ? action.payload.data.totalItems : 0;
			const dataObj = [];
			action.payload.data.data !== null && action.payload.data.data.map((d) => (dataObj.push({ id: d.trngAppId, ...d })));
		
			empTrainingApplicationListingAdapter.setAll(state, action.payload.data.data !== null ? dataObj : []);
		}
	}
});

export const { setTrainingApplicationListingSearchText } = empTrainingApplicationListingSlice.actions;

export default empTrainingApplicationListingSlice.reducer;
