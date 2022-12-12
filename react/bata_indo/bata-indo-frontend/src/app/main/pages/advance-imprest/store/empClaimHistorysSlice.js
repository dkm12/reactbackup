import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getClaimHistorys = createAsyncThunk('advanceImprest/empClaimHistorys/getEmpClaimHistorys', async params => {
	const responseLR = await axios.get(api.advanceImprest.getById + params.advanceImprestId);
	const dataLR = await responseLR.data.data;
	let trxNo = dataLR.trxNo;
	const response = await axios.post(api.advanceImprest.getWorkflowHistory,
		{
			"trxNo": trxNo,
			"startWith": "0",
			"dataSize": "10",
			"sortBy": "activityStartDate"
		}
	);
	// const data = await response.data.data;
	const data = [];
	console.log("response.data.data", response.data);
	response.data.data.map((d) => (data.push({ id: d.id, ...d })));

	return data;
});

const empClaimHistorysAdapter = createEntityAdapter({});

export const { selectAll: selectClaimHistorys, selectById: selectClaimHistorysById } = empClaimHistorysAdapter.getSelectors(
	state => state.advanceImprest.empClaimHistorys
);

const empClaimHistorysSlice = createSlice({
	name: 'advanceImprest/empClaimHistorys',
	initialState: empClaimHistorysAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setClaimHistorysSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getClaimHistorys.fulfilled]: empClaimHistorysAdapter.setAll
	}
});

export const { setClaimHistorysSearchText } = empClaimHistorysSlice.actions;

export default empClaimHistorysSlice.reducer;
