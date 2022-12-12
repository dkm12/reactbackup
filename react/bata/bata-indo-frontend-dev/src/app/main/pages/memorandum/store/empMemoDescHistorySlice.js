import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getMemoDescHistory = createAsyncThunk('memorandum/empMemoDescHistory/getEmpMemoDescHistory', async params => {
	const response = await axios.get(api.memorandum.getDescLog  + params.memorandumId);
	// const data = await response.data.data;
	const data = [];
	console.log("response.data.data", response.data);
	response.data.data.map((d) => (data.push({ id: d.id, ...d })));

	return data;
});

const empMemoDescHistoryAdapter = createEntityAdapter({});

export const { selectAll: selectMemoDescHistory, selectById: selectMemoDescHistoryById } = empMemoDescHistoryAdapter.getSelectors(
	state => state.memorandum.empMemoDescHistory
);

const empMemoDescHistorySlice = createSlice({
	name: 'memorandum/empMemoDescHistory',
	initialState: empMemoDescHistoryAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setMemoDescHistorySearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getMemoDescHistory.fulfilled]: empMemoDescHistoryAdapter.setAll
	}
});

export const { setMemoDescHistorySearchText } = empMemoDescHistorySlice.actions;

export default empMemoDescHistorySlice.reducer;
