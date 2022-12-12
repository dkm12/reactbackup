import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';

export const getPollMasterList = createAsyncThunk('pollSurvey/pollMasterList/getPollMasterList',  async param => {
	let url = {}
	url.pageNo = param.pgNo
	url.pageSize = param.pgSize
	if(param.questio) url.questio = param.questio
	if(param.publishedFromDate) url.publishedFromDate = param.publishedFromDate
	if(param.publishedToDate) url.publishedToDate = param.publishedToDate
    const response = await axios.post(api.pollSurvey.getAllMaster, url);
	const formData = [];
	let data = {};
	if ('data' in response && response.data != null) {
		response.data.data.data.map((d) => (formData.push({ id: d.surveyId, ...d })));
		data = { 'totalItems': response.data.data.totalItems, 'data': formData }
	}
	console.log(data)
	return data;
});

const pollMasterAdapter = createEntityAdapter({});

export const { selectAll: selectPollMasterData, selectById: selectPollMasterById } = pollMasterAdapter.getSelectors(
	state => state.pollSurvey.pollMasterSlice
);

const pollMasterSlice = createSlice({
	name: 'pollSurvey/pollMasterList',
	initialState: pollMasterAdapter.getInitialState({
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
		[getPollMasterList.fulfilled]: (state, action) => {
			state.totalItems = action.payload.totalItems !== null ? action.payload.totalItems : 0;
			pollMasterAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		}
	}
});

export const { setpollsSearchText } = pollMasterSlice.actions;

export default pollMasterSlice.reducer;