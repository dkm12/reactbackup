import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';

export const getCurrentGraphList = createAsyncThunk('pollSurvey/currentGraph/getCurrentGraphList',  async param => {
    const response = await axios.get(api.pollSurvey.getGraph+param);
    console.log(response)
	const data = [];
    response.data.data.map((d) => (data.push({ id: d.optionId, ...d })));
    return data
});

const currentGraphAdapter = createEntityAdapter({});

export const { selectAll: selectCurrGraphData, selectById: selectCurrGraphById } = currentGraphAdapter.getSelectors(
	state => state.pollSurvey.currGraphSlice
);

const currGraphSlice = createSlice({
	name: 'pollSurvey/currentGraph',
	initialState: currentGraphAdapter.getInitialState({
		searchText: '',
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
		[getCurrentGraphList.fulfilled]: (state, action) => {
			currentGraphAdapter.setAll(state, action.payload !== null ? action.payload : []);
		}
	}
});

export const { setpollsSearchText } = currGraphSlice.actions;

export default currGraphSlice.reducer;