import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getPollMasters = createAsyncThunk('pollSurvey/empPollMasters/getEmpPollMasters', async obj => {
	const response = await axios.get(api.travelClaim.getCreatedBy + obj.uuid + "?pageNo=" + obj.page + "&pageSize=" + obj.rowsPerPage);
	// const data = await response.data.data;
	// const data = [];
	// response.data.data.map((d) => (data.push({ id: d.id, ...d })));
	let data = {};
	if ('data' in response && response.data != null) {
		data = response.data;
	}

	return data;
});

const empPollMastersAdapter = createEntityAdapter({});

export const { selectAll: selectPollMasters, selectById: selectPollMastersById } = empPollMastersAdapter.getSelectors(
	state => state.pollSurvey.empPollMasters
);

const empPollMastersSlice = createSlice({
	name: 'pollSurvey/empPollMasters',
	initialState: empPollMastersAdapter.getInitialState({
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
		[getPollMasters.fulfilled]: (state, action) => {
			state.totalRecords = action.payload.dataSize !== null ? action.payload.dataSize : 0;
			empPollMastersAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		}
	}
});

export const { setPollMastersSearchText } = empPollMastersSlice.actions;

export default empPollMastersSlice.reducer;
