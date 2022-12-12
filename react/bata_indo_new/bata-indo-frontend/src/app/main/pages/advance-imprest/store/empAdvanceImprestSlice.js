import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { push } from 'react-router-redux';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getAdvanceImprest = createAsyncThunk('advanceImprest/empAdvanceImprest/getAdvanceImprest', async params => {
	const response = await axios.get(api.advanceImprest.getById + params.advanceImprestId);
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

export const saveAdvanceImprest = createAsyncThunk('advanceImprest/empAdvanceImprest/saveAdvanceImprest', async (advanceImprest, thunkAPI) => {
	thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.post(api.advanceImprest.create, advanceImprest);
	const data = await response.data;
	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push({
			pathname: '/app/employee-service/advance-imprest'
		});
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data;
});



const empAdvanceImprestSlice = createSlice({
	name: 'advanceImprest/empAdvanceImprest',
	initialState: null,
	reducers: {
		newAdvanceImprest: {
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
		[getAdvanceImprest.fulfilled]: (state, action) => action.payload,
		[saveAdvanceImprest.fulfilled]: (state, action) => action.payload
	}
});

export const { newAdvanceImprest } = empAdvanceImprestSlice.actions;

export default empAdvanceImprestSlice.reducer;
