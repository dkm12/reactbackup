import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getProfile = createAsyncThunk(
  'auth/myProfile/getMyProfile', async emp => {
	const res = await axios.get(api.auth.getMyProfile+emp);
	const data = [];
    if(res && res.data && res.data.data && res.data.status == '200') res.data.data.map((d) => (data.push({ id: d.id, ...d })));
	return data;
});

const myProfileAdapter = createEntityAdapter({});

export const { selectAll: selectProfile, selectById: selectProfileById } = myProfileAdapter.getSelectors(
	state => state.auth.myProfile
);

const myProfileSlice = createSlice({
	name: 'auth/myProfile',
	initialState: myProfileAdapter.getInitialState({
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
		[getProfile.fulfilled]: myProfileAdapter.setAll
	}
});

export const { setProfileSearchText } = myProfileSlice.actions;

export default myProfileSlice.reducer;
