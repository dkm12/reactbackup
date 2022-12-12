import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import _ from "@lodash";
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getTrainingApplication = createAsyncThunk('training/empTrainingApplication/getTrainingApplication', async params => {
	console.log("params", params);
	console.log("uuid", params.uuid);
	const response = await axios.get(api.training.getByTrngAppId + params.trngAppId);
	const data = await response.data.data;
	
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

export const saveTrainingApplication = createAsyncThunk('training/empTrainingApplication/saveTrainingApplication', async (claimRequest, thunkAPI) => {
	thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.put(api.training.runWorkflow, claimRequest);
	const data = await response.data;
	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push({
			pathname: '/app/hr-services/training-applications'
		});
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data;
});

const empTrainingApplicationAdapter = createEntityAdapter({});

const empTrainingApplicationSlice = createSlice({
	name: 'training/empTrainingApplication',
	initialState: empTrainingApplicationAdapter.getInitialState({
		nextApprovers: []
	}),
	reducers: {
		newTrainingApplication: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					nextApprovers: []
				}
			})
		}
	},
	extraReducers: {
		[getTrainingApplication.fulfilled]: (state, action) => action.payload,
		[saveTrainingApplication.fulfilled]: (state, action) => action.payload
	}
});

export const { newTrainingApplication } = empTrainingApplicationSlice.actions;

export default empTrainingApplicationSlice.reducer;
