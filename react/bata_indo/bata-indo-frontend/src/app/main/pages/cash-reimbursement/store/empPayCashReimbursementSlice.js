import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import _ from "@lodash";
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getPayCashReimbursement = createAsyncThunk('cashReimbursement/empPayCashReimbursement/getPayCashReimbursement', async params => {
	console.log("params", params);
	console.log("uuid", params.uuid);
	const response = await axios.get(api.cashReimbursement.getById + params.cashReimbursementId);
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

export const savePayCashReimbursement = createAsyncThunk('cashReimbursement/empPayCashReimbursement/savePayCashReimbursement', async (claimRequest, thunkAPI) => {
	thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.post(api.cashReimbursement.updateByCashier, claimRequest);
	const data = await response.data;
	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push({
			pathname: '/app/cashier-requests/cash-reimbursement'
		});
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data;
});

const empPayCashReimbursementAdapter = createEntityAdapter({});

const empPayCashReimbursementSlice = createSlice({
	name: 'cashReimbursement/empPayCashReimbursement',
	initialState: empPayCashReimbursementAdapter.getInitialState({
		nextApprovers: []
	}),
	reducers: {
		newPayCashReimbursement: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					nextApprovers: []
				}
			})
		}
	},
	extraReducers: {
		[getPayCashReimbursement.fulfilled]: (state, action) => action.payload,
		[savePayCashReimbursement.fulfilled]: (state, action) => action.payload
	}
});

export const { newPayCashReimbursement } = empPayCashReimbursementSlice.actions;

export default empPayCashReimbursementSlice.reducer;
