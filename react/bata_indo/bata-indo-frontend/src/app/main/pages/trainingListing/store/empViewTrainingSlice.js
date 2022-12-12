import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import _ from "@lodash";
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getViewTraining = createAsyncThunk('training/empViewTraining/getViewTraining', async params => {
	console.log("params", params);
	console.log("uuid", params.uuid);
	const response = await axios.get(api.training.getById + params.trainingId);
	const data = await response.data.data;

	let createdBy = data.createdBy;
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

export const applyTraining = createAsyncThunk('training/empViewTraining/applyTraining', async (applyRequest, thunkAPI) => {
	thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.post(api.training.applyRequest, applyRequest);
	const data = await response.data;
	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push({
			pathname: '/app/employee-service/open-training-list'
		});
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data;
});

const empViewTrainingAdapter = createEntityAdapter({});

const empViewTrainingSlice = createSlice({
	name: 'training/empViewTraining',
	initialState: empViewTrainingAdapter.getInitialState({
		nextApprovers: []
	}),
	reducers: {
		newViewTraining: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					nextApprovers: []
				}
			})
		}
	},
	extraReducers: {
		[getViewTraining.fulfilled]: (state, action) => action.payload,
		[applyTraining.fulfilled]: (state, action) => action.payload
	}
});

export const { newViewTraining } = empViewTrainingSlice.actions;

export default empViewTrainingSlice.reducer;
