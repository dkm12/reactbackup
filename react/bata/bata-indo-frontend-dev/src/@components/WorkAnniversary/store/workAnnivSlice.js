import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';

export const getWorkAnniversaryList = createAsyncThunk('anniversary/workAnniv/getWorkAnniversaryList', async param => {
	const response = await axios.get(api.anniversary.getAllWorkAnniversary);
	const formData = [];
	let data = {};
	let total = 0;
	if (response && response.data && response.data.data) {
		response.data.data.map((d) => { if (d) (formData.push({ id: d.emp_code, ...d })) });
		total = response.data.dataSize;
	}
	data = { 'totalItems': total, 'data': formData }
	return data;
});

const workAnnivAdapter = createEntityAdapter({});

export const { selectAll: selectworkAnniv, selectById: selectworkAnnivById } = workAnnivAdapter.getSelectors(
	state => state.anniversary.workAnniv
);

const workAnnivSlice = createSlice({
	name: 'anniversary/workAnniv',
	initialState: workAnnivAdapter.getInitialState({
		searchText: '',
		totalItems: 0
	}),

	reducers: {
		setworkAnnivSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getWorkAnniversaryList.fulfilled]: (state, action) => {
			state.totalItems = action.payload.totalItems !== null ? action.payload.totalItems : 0;
			workAnnivAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		},
	}
});

export const { setworkAnnivSearchText } = workAnnivSlice.actions;

export default workAnnivSlice.reducer;