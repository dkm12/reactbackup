import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getLocalConveyances = createAsyncThunk('localConveyance/empLocalConveyances/getEmpLocalConveyances', async obj => {
	// let postData = {}
	// postData.pageNo = param.pgNo
	// postData.pageSize = param.pgSize
	// if (param.claimFromDate) postData.claimFromDate = param.claimFromDate
	// if (param.claimToDate) postData.claimToDate = param.claimToDate
	// if (param.fromAmount) postData.fromAmount = param.fromAmount
	// if (param.toAmount) postData.toAmount = param.toAmount
	// if (param.status) postData.status = param.status
	let params = {
		"pageNo": obj.page,
		"pageSize": obj.rowsPerPage
	};
	if ('claimFromDate' in obj.filterData && obj.filterData.claimFromDate !== "") params.claimFromDate = obj.filterData.claimFromDate;
	if ('claimToDate' in obj.filterData && obj.filterData.claimToDate !== "") params.claimToDate = obj.filterData.claimToDate;
	if ('fromAmount' in obj.filterData && obj.filterData.fromAmount !== "") params.fromAmount = obj.filterData.fromAmount;
	if ('toAmount' in obj.filterData && obj.filterData.toAmount !== "") params.toAmount = obj.filterData.toAmount;
	if ('status' in obj.filterData && obj.filterData.status !== "") params.status = obj.filterData.status;
	const response = await axios.post(api.localConveyance.getCreatedBy, params);
	const formData = [];
	let data = {};
	console.log("response>>>>", response)
	if ('data' in response.data && response.data.data != null) {
		response.data.data.data.map((d) => (formData.push({ id: d.lcId, ...d })));
		data = { 'totalItems': response.data.data.totalItems, 'data': formData }
	}
	console.log(data)
	return data;
	// if ('data' in response && response.data != null) {
	// 	data = response.data;
	// }
	// return data;
});

const empLocalConveyancesAdapter = createEntityAdapter({});

export const { selectAll: selectLocalConveyances, selectById: selectLocalConveyancesById } = empLocalConveyancesAdapter.getSelectors(
	state => state.localConveyance.empLocalConveyances
);

const empLocalConveyancesSlice = createSlice({
	name: 'localConveyance/empLocalConveyances',
	initialState: empLocalConveyancesAdapter.getInitialState({
		searchText: '',
		totalRecords: 0
	}),
	reducers: {
		setProductsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getLocalConveyances.fulfilled]: (state, action) => {
			state.totalRecords = action.payload.totalItems !== null ? action.payload.totalItems : 0;
			empLocalConveyancesAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		}


		// (state, action) => {
		// 	state.totalRecords = action.payload.dataSize !== null ? action.payload.dataSize : 0;
		// 	const dataObj = [];
		// 	action.payload.data !== null && action.payload.data.map((d) => (dataObj.push({ id: d.lcId, ...d })));
		// 	empLocalConveyancesAdapter.setAll(state, action.payload.data !== null ? dataObj : []);
		// }
	}
});

export const { setLocalConveyancesSearchText } = empLocalConveyancesSlice.actions;

export default empLocalConveyancesSlice.reducer;
