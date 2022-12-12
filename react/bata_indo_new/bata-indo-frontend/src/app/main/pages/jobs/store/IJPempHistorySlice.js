import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getClaimHistorys = createAsyncThunk('applicants/empIjpHistorys/getEmpIjpHistorys', async params => {
	const resp = await axios.get(api.applicants.ijpGetById+'/'+params);
	const dataLR = await resp.data.data;
	let trxNo = dataLR.ijpTrxNo;
    console.log(trxNo)
	const response = await axios.post(api.travelClaim.getWorkflowHistory,
		{
			"trxNo": trxNo,
			"startWith": "0",
			"dataSize": "10",
			"sortBy": "activityStartDate"
		}
	);
	const data = [];
	response.data.data.map((d) => (data.push({ id: d.id, ...d })));

	return data;
});

const empIjpHistorysAdapter = createEntityAdapter({});

export const { selectAll: selectClaimHistorys, selectById: selectClaimHistorysById } = empIjpHistorysAdapter.getSelectors(
	state => state.applicants.empIjpHistorys
);

const empIjpHistorysSlice = createSlice({
	name: 'applicants/empIjpHistorys',
	initialState: empIjpHistorysAdapter.getInitialState({
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
		[getClaimHistorys.fulfilled]: empIjpHistorysAdapter.setAll
	}
});

export const { setClaimHistorysSearchText } = empIjpHistorysSlice.actions;

export default empIjpHistorysSlice.reducer;
