import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { push } from 'react-router-redux';
import FuseUtils from '@core/utils';
import api from '@api';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';


export const getLocalConveyance = createAsyncThunk('localConveyance/empLocalConveyance/getLocalConveyance', async params => {
	const response = await axios.get(api.localConveyance.getById + params.localConveyanceId);
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

export const saveLocalConveyance = createAsyncThunk('localConveyance/empLocalConveyance/saveLocalConveyance', async (localConveyance, thunkAPI) => {
	thunkAPI.dispatch(showSplash({ state: true }));
	console.log("localConveyance", localConveyance)
	const response = await axios.post(api.localConveyance.create, localConveyance);
	const data = await response.data;

	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}
	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push('/app/employee-service/local-conveyance');
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}

	return data;
});



const empLocalConveyanceSlice = createSlice({
	name: 'localConveyance/empLocalConveyance',
	initialState: null,
	reducers: {
		newLocalConveyance: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					"lcId": null,
					"createdBy": event.uuid,
					"empRemark": "",
					"paidAmt": "",
					"totalAmt": "",
					"convyDtlList": [
						{
							"fromLoc": "",
							"toLoc": "",
							"modeOfTravel": "",
							"modAttachment": "",
							"tollAmount": "",
							"tollAttachment": null,
							"parkingAmount": "",
							"parkingAttachment": null,
							"trvlPurpose": "",
							"trvlFromDate": "",
							"trvlToDate": "",
							"modeOfTrvlOth": "",
							"foodMeal": "",
							"foodMealAmount": null,
							"billAmt": ""
						}
					],
				}
			})
		}
	},
	extraReducers: {
		[getLocalConveyance.fulfilled]: (state, action) => action.payload,
		[saveLocalConveyance.fulfilled]: (state, action) => action.payload
	}
});

export const { newLocalConveyance } = empLocalConveyanceSlice.actions;

export default empLocalConveyanceSlice.reducer;
