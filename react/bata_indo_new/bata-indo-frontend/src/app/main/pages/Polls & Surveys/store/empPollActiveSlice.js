import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';

export const getActivePollList = createAsyncThunk('pollSurvey/activePollList/getActivePollList',  async param => {
	let url = {}
	url.pageNo = param.pgNo
	url.pageSize = param.pgSize
    const response = await axios.post(api.pollSurvey.getAllActive, url);
	const formData = [];
	let data = {};
	if ('data' in response && response.data != null) {
		response.data.data.data.map((d) => (formData.push({ id: d.surveyId, ...d })));
		data = { 'totalItems': response.data.data.totalItems, 'data': formData }
	}
	console.log(data)
	return data;
});

const activePollAdapter = createEntityAdapter({});

export const { selectAll: selectActivePollData, selectById: selectActivePollById } = activePollAdapter.getSelectors(
	state => state.pollSurvey.activePollSlice
);

const activePollSlice = createSlice({
	name: 'pollSurvey/activePollList',
	initialState: activePollAdapter.getInitialState({
		searchText: '',
		totalItems: 0
	}),
	
	reducers: {
		setpollsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getActivePollList.fulfilled]: (state, action) => {
			state.totalItems = action.payload.totalItems !== null ? action.payload.totalItems : 0;
			activePollAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		}
	}
});

export const { setpollsSearchText } = activePollSlice.actions;

export default activePollSlice.reducer;