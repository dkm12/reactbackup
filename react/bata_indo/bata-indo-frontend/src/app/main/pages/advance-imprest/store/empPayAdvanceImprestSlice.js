import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import _ from "@lodash";
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getPayAdvanceImprest = createAsyncThunk('advanceImprest/empPayAdvanceImprest/getPayAdvanceImprest', async params => {
	console.log("params", params);
	console.log("uuid", params.uuid);
	const response = await axios.get(api.advanceImprest.getById + params.advanceImprestId);
	const data = await response.data.data;
	let createdBy = data.createdBy;
	const responseCreatedByData = await axios.get(api.auth.getUserDetail + createdBy);
	let createdByData = await responseCreatedByData.data.data;
	data.fullname = createdByData[0].fullname;
	data.designation = createdByData[0].designation;
	data.department = createdByData[0].department;
	data.location = createdByData[0].location;

	return data;
});

export const savePayAdvanceImprest = createAsyncThunk('advanceImprest/empPayAdvanceImprest/savePayAdvanceImprest', async (claimRequest, thunkAPI) => {
	thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.post(api.advanceImprest.updateByCashier, claimRequest);
	const data = await response.data;
	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push({
			pathname: '/app/cashier-requests/advance-imprest'
		});
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data;
});

const empPayAdvanceImprestAdapter = createEntityAdapter({});

const empPayAdvanceImprestSlice = createSlice({
	name: 'advanceImprest/empPayAdvanceImprest',
	initialState: empPayAdvanceImprestAdapter.getInitialState({
		nextApprovers: []
	}),
	reducers: {
		newPayAdvanceImprest: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					nextApprovers: []
				}
			})
		}
	},
	extraReducers: {
		[getPayAdvanceImprest.fulfilled]: (state, action) => action.payload,
		[savePayAdvanceImprest.fulfilled]: (state, action) => action.payload
	}
});

export const { newPayAdvanceImprest } = empPayAdvanceImprestSlice.actions;

export default empPayAdvanceImprestSlice.reducer;
