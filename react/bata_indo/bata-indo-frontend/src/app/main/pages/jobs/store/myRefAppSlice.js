import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getMyREFApp = createAsyncThunk('jobs/myRefApplication/getMyREFApp', async param => {
	let url = {}
	url.pageNo = param.pgNo 
	url.pageSize = param.pgSize;
	const response = await axios.post(api.applicants.getMyRefApp, url);
    console.log(response)
	const formData = [];
	let data = {};
	if ('data' in response.data && response.data.data != null) {
		response.data.data.data.map((d) => (formData.push({ id: d.jrtRecrId, ...d })));
		data = { 'totalItems': response.data.data.totalItems, 'data': formData }
	}
	console.log(data)
	return data;
});

const myRefApplicationAdapter = createEntityAdapter({});

export const { selectAll: selectMyRefApp, selectById: selectMyRefAppById } = myRefApplicationAdapter.getSelectors(
	state => state.jobs.myRefApplication
);

const myRefApplicationSlice = createSlice({
	name: 'jobs/myRefApplication',
	initialState: myRefApplicationAdapter.getInitialState({
		searchText: '',
		totalRecords: 0
	}),
	reducers: {
		setJobPostingsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getMyREFApp.fulfilled]: (state, action) => {
			state.totalRecords = action.payload.totalItems !== null ? action.payload.totalItems : 0;
			myRefApplicationAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		}
	}
});

export const { setJobPostingsSearchText } = myRefApplicationSlice.actions;

export default myRefApplicationSlice.reducer;