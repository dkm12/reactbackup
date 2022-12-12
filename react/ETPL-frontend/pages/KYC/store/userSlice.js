import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from 'lodash';
import Router from 'next/router';

export const getMyAadhar = createAsyncThunk('jobs/myAadhar/getMyAadhar', async param => {
	const response = await axios(param.param);
    console.log(response)
	let formData=[]
	let data = {};
	if (response.data && response.data.status == '200') {
		localStorage.setItem('aadhar_name', response.data.data.result.user_full_name);
        response.data.data.result.id = 1
        formData.push(response.data.data.result)
		data = { 'data': formData }

		let userData = {
			'aadharNo': param.aadhar,
			'agentCategory': param.role,
			'fullName': response.data.data.result.user_full_name,
			'dob': response.data.data.result.user_dob,
			'state': response.data.data.result.user_address.state,
			'city': response.data.data.result.user_address.dist,
			'gender': response.data.data.result.user_gender,
			'pin': response.data.data.result.address_zip,
			'profileimg': response.data.data.result.user_profile_image,
		}
		localStorage.setItem('aadhar_name', response.data.data.result.user_full_name);
		localStorage.setItem('aadhar_user', JSON.stringify(userData));

        Router.push('/KYC/pankyc')
	}
	else{alert("Something went wrong")}
	console.log(data)
	return data;
});

const myAadharAdapter = createEntityAdapter({});

export const { selectAll: selectMyAadhar, selectById: selectMyAadharById } = myAadharAdapter.getSelectors(
	state => state.jobs.myAadhar
);

const myAadharSlice = createSlice({
	name: 'jobs/myAadhar',
	initialState: myAadharAdapter.getInitialState({
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
		[getMyAadhar.fulfilled]: (state, action) => {
			// state.totalRecords = action.payload.totalItems !== null ? action.payload.totalItems : 0;
			myAadharAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		}
	}
});

export const { setJobPostingsSearchText } = myAadharSlice.actions;

export default myAadharSlice.reducer;