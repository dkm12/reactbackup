import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import _ from "@lodash";
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getApproveRequest = createAsyncThunk('training/empApproveRequest/getApproveRequest', async params => {
	console.log("params", params);
	console.log("uuid", params.uuid);
	const response = await axios.get(api.training.getByTrngAppId + params.trngAppId);
	const data = await response.data.data;
	
	data.nextApprover = [];
	if (data.statusCode === "PENDING_WITH_RM") {
		const responseTRNGAPPROVERL1 = await axios.get(api.training.getTRNGAPPROVERL1);
		let nextApproverArray = await responseTRNGAPPROVERL1.data.data;
		const nextApprover = [];
		_.isArray(nextApproverArray)
			&& nextApproverArray.map((d) => (nextApprover.push({ value: d.employId, title: d.fullname + " (" + d.employId + ")" })));
		data.nextApprover = nextApprover;
	}
	let createdBy = data.appliedById;
	const responseCreatedByData = await axios.get(api.auth.getUserDetail + createdBy);
	let createdByData = await responseCreatedByData.data.data;
	data.fullname = createdByData[0].fullname;
	data.designation = createdByData[0].designation;
	data.department = createdByData[0].department;
	data.location = createdByData[0].location;
	// data.=createdByData.;
	// data.=createdByData.;
	// data.=createdByData.;

	// const data = [];
	// data[0]=response.data.data;

	return data;
});

export const saveApproveRequest = createAsyncThunk('training/empApproveRequest/saveApproveRequest', async (claimRequest, thunkAPI) => {
	thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.put(api.training.runWorkflow, claimRequest);
	const data = await response.data;
	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push({
			pathname: '/app/claim-requests/training-requests'
		});
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data;
});

const empApproveRequestAdapter = createEntityAdapter({});

const empApproveRequestSlice = createSlice({
	name: 'training/empApproveRequest',
	initialState: empApproveRequestAdapter.getInitialState({
		nextApprovers: []
	}),
	reducers: {
		newApproveRequest: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					nextApprovers: []
				}
			})
		}
	},
	extraReducers: {
		[getApproveRequest.fulfilled]: (state, action) => action.payload,
		[saveApproveRequest.fulfilled]: (state, action) => action.payload
	}
});

export const { newApproveRequest } = empApproveRequestSlice.actions;

export default empApproveRequestSlice.reducer;
