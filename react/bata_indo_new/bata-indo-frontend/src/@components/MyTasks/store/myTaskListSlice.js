import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';

export const getMyTaskCountList = createAsyncThunk('mytask/myTaskCount/getMyTaskCountList',  async param => {
	const response = await axios.get(api.mytask.getAllTasks);
	return response.data;
});


const myTaskCountAdapter = createEntityAdapter({});

export const { selectAll: selectMyTaskCount, selectById: selectMyTaskCountById } = myTaskCountAdapter.getSelectors(
	state => state.mytask.myTaskCount
);

const myTaskCountSlice = createSlice({
	name: 'mytask/myTaskCount',
	initialState: myTaskCountAdapter.getInitialState({
		searchText: '',
	}),
	
	reducers: {
		setMyTasksSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getMyTaskCountList.fulfilled]: (state, action) => {
			myTaskCountAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		}
	}
});

export const { setMyTasksSearchText } = myTaskCountSlice.actions;

export default myTaskCountSlice.reducer;