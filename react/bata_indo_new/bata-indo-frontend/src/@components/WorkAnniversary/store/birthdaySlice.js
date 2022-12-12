import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';

export const getBirthDayList = createAsyncThunk('anniversary/birthDay/getBirthDayList', async param => {
	const response = await axios.get(api.anniversary.getAllBday + '?pageNo=0&pageSize=' + param);
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

const birthDayAdapter = createEntityAdapter({});

export const { selectAll: selectbirthDay, selectById: selectbirthDayById } = birthDayAdapter.getSelectors(
	state => state.anniversary.birthDay
);

const birthDaySlice = createSlice({
	name: 'anniversary/birthDay',
	initialState: birthDayAdapter.getInitialState({
		searchText: '',
		totalItems: 0
	}),

	reducers: {
		setbDaySearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getBirthDayList.fulfilled]: (state, action) => {
			state.totalItems = action.payload.totalItems !== null ? action.payload.totalItems : 0;
			birthDayAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		},
	}
});

export const { setbDaySearchText } = birthDaySlice.actions;

export default birthDaySlice.reducer;