import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getLeaveRequest = createAsyncThunk('leaveRequest/empLeaveRequest/getLeaveRequest', async params => {
	//console.log("params",params);
	const response = await axios.get(api.leaveRequest.getById+params.leaveRequestId);
	const data = await response.data.data;
	// const data = [];
	// data[0]=response.data.data;
	
	return data;
});

export const saveLeaveRequest = createAsyncThunk('leaveRequest/empLeaveRequest/saveLeaveRequest', async (leaveRequest,thunkAPI) => {
	thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.post(api.leaveRequest.create, leaveRequest);
	const data = await response.data;

	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push({
			pathname: '/app/hr-services/leave-requests'
		});
	}
	else if (data.status == "406") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
		return data.data;
	}
	else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}

	return data;
});

const empLeaveRequestSlice = createSlice({
	name: 'leaveRequest/empLeaveRequest',
	initialState: null,
	reducers: {
		newLeaveRequest: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: null,
					leaveType: "annualLeave"
				}
			})
		}
	},
	extraReducers: {
		[getLeaveRequest.fulfilled]: (state, action) => action.payload,
		[saveLeaveRequest.fulfilled]: (state, action) => action.payload
	}
});

export const { newLeaveRequest } = empLeaveRequestSlice.actions;

export default empLeaveRequestSlice.reducer;
