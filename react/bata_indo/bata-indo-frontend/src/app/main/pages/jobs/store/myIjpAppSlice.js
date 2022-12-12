import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getMyIJPApp = createAsyncThunk('jobs/myIjpApplication/getMyIJPApp', async param => {
	let url = '?pageNo='+param.pgNo+'&pageSize='+param.pgSize;
	const response = await axios.get(api.applicants.getMyIJPApp+url);
    console.log(response)
	const formData = [];
	let data = {};
	if ('data' in response.data && response.data.data != null) {
		response.data.data.data.map((d) => (formData.push({ id: d.ijpTrxNo, ...d })));
		data = { 'totalItems': response.data.data.totalItems, 'data': formData }
	}
	console.log(data)
	return data;
});

const myIjpApplicationAdapter = createEntityAdapter({});

export const { selectAll: selectMyIjpApp, selectById: selectMyIjpAppById } = myIjpApplicationAdapter.getSelectors(
	state => state.jobs.myIjpApplication
);

const myIjpApplicationSlice = createSlice({
	name: 'jobs/myIjpApplication',
	initialState: myIjpApplicationAdapter.getInitialState({
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
		[getMyIJPApp.fulfilled]: (state, action) => {
			state.totalRecords = action.payload.totalItems !== null ? action.payload.totalItems : 0;
			myIjpApplicationAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		}
	}
});

export const { setJobPostingsSearchText } = myIjpApplicationSlice.actions;

export default myIjpApplicationSlice.reducer;