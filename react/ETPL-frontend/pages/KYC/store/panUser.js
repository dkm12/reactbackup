import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from 'lodash';
import Router from 'next/router';

export const getMyPAN = createAsyncThunk('jobs/panUser/getMyPAN', async param => {
	const response = await axios(param.param);
    console.log(response)
	let formData=[]
	let data = {};
	if (response.data && response.data.status == '200' && response.data.data.result.user_full_name) {
            if ((response.data.data.result.user_full_name).toUpperCase() == (localStorage.getItem('aadhar_name')).toUpperCase()) {
                localStorage.setItem('panNo', response.data.data.result.pan_number);
                Router.push('/KYC/updateProfile')
            }
            else {
                alert("Name did not match to aadhar name")
            }
        response.data.data.result.id = 1
        formData.push(response.data.data.result)
		data = { 'data': formData }
    }
	console.log("RRRRTTTTT",data)
	return data;
});

const panUserAdapter = createEntityAdapter({});

export const { selectAll: selectMyPan, selectById: selectMyPanById } = panUserAdapter.getSelectors(
	state => state.jobs.panUser
);

const panUserSlice = createSlice({
	name: 'jobs/panUser',
	initialState: panUserAdapter.getInitialState({
		searchText: '',
		// totalRecords: 0
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
		[getMyPAN.fulfilled]: (state, action) => {
			// state.totalRecords = action.payload.totalItems !== null ? action.payload.totalItems : 0;
			panUserAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		}
	}
});

export const { setJobPostingsSearchText } = panUserSlice.actions;

export default panUserSlice.reducer;