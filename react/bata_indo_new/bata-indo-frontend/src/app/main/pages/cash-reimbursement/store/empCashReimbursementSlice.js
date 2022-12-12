import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { push } from 'react-router-redux';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getCashReimbursement = createAsyncThunk('cashReimbursement/empCashReimbursement/getCashReimbursement', async params => {
	const response = await axios.get(api.cashReimbursement.getById + params.cashReimbursementId);
	const data = await response.data.data;

	let createdBy = data.createdBy;
	const responseCreatedByData = await axios.get(api.auth.getUserDetail + createdBy);
	let createdByData = await responseCreatedByData.data.data;
	data.fullname = createdByData[0].fullname;
	data.designation = createdByData[0].designation;
	data.department = createdByData[0].department;
	data.location = createdByData[0].location;

	// const data = [];
	// data[0]=response.data.data;

	return data;
});

export const saveCashReimbursement = createAsyncThunk('cashReimbursement/empCashReimbursement/saveCashReimbursement', async (cashReimbursement, thunkAPI) => {
	thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.post(api.cashReimbursement.create, cashReimbursement);
	const data = await response.data;
	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push({
			pathname: '/app/employee-service/cash-reimbursement'
		});
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data;
});



const empCashReimbursementSlice = createSlice({
	name: 'cashReimbursement/empCashReimbursement',
	initialState: null,
	reducers: {
		newCashReimbursement: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					"id": null,
					"crList": [
						{
							"purpose": "",
							"billNo": "",
							"crExpenseDate": "",
							"amount": "0",
							"attachmentId": ""
						}
					]
				}
			})
		}
	},
	extraReducers: {
		[getCashReimbursement.fulfilled]: (state, action) => action.payload,
		[saveCashReimbursement.fulfilled]: (state, action) => action.payload
	}
});

export const { newCashReimbursement } = empCashReimbursementSlice.actions;

export default empCashReimbursementSlice.reducer;
