import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getempNewJoineeList = createAsyncThunk('newJoinee/empNewJoinee/getNewJoineeList', async () => {
	const response = await axios.get(api.newJoinee.getAll);
	const data = [];
	console.log('data :>>', response.data.data)
	response.data.data.map((d) => (data.push({ id: d.id, ...d })));
	return data;
});

const empNewJoineeAdapter = createEntityAdapter({});

export const { selectAll: selectNewJoinee, selectById: selectNewJoineeById } = empNewJoineeAdapter.getSelectors(
	state => state.newJoinee.NewJoineeList
);

const NewJoineeListSlice = createSlice({
	name: 'newJoinee/NewJoineeList',
	initialState: empNewJoineeAdapter.getInitialState({
		searchText: ''
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
		[getempNewJoineeList.fulfilled]: empNewJoineeAdapter.setAll
	}
});

export const { setAnnouncementSearchText } = NewJoineeListSlice.actions;

export default NewJoineeListSlice.reducer;
