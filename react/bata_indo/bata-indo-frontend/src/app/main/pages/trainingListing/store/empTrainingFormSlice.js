import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getTrainingInfo = createAsyncThunk('training/empTrainingForm/getTrainingInfo', async tid => {
	//console.log("params",params);
	const response = await axios.get(api.training.getById + tid);
	const data = await response.data.data;
	console.log('datadddddddd :>> ', data);
	// const data = [];
	// data[0]=response.data.data;
	return data;
});

export const saveTrainingInfo = createAsyncThunk('training/empTrainingForm/saveTrainingInfo', async (params,thunkAPI) => {
	thunkAPI.dispatch(showSplash({ state: true }));
	let response 
	if (params.type == 'save') {
		response = await axios.post(api.training.save, params.data);
	} else if (params.type == 'update') {
		response = await axios.put(api.training.updateById + '/' + params.data.trngId, params.data);
	}
	// else if(params.type == 'publish'){
	// 	response = await axios.put(api.training.updateStatus + '/' + params.data.trngId, { "trngStatus": "open" })
	// }
	const data = await response.data;
	console.log("data",data);

	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push({
			pathname: '/app/hr-services/training-admin-list'
		});
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}

	return data;
});

const empTrainingFormSlice = createSlice({
	name: 'training/empTrainingForm',
	initialState: null,
	reducers: {
		newTrainingRequest: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					trngId: null
				}
			})
		}
	},
	extraReducers: {
		[getTrainingInfo.fulfilled]: (state, action) => action.payload,
		[saveTrainingInfo.fulfilled]: (state, action) => action.payload
	}
});

export const { newTrainingRequest } = empTrainingFormSlice.actions;

export default empTrainingFormSlice.reducer;
