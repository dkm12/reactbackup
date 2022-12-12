import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { push } from 'react-router-redux';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getTravelClaim = createAsyncThunk('travelClaim/empTravelClaim/getTravelClaim', async params => {
	const response = await axios.get(api.travelClaim.getById + params.travelClaimId);
	const data = await response.data.data;

	let createdBy = data.createdBy;
	const responseCreatedByData = await axios.get(api.auth.getUserDetail + createdBy);
	let createdByData = await responseCreatedByData.data.data;
	data.fullname = createdByData[0].fullname;
	data.designation = createdByData[0].designation;
	data.department = createdByData[0].department;
	data.location = createdByData[0].location;

	let trvlDtlList=data.trvlDtlList;
	trvlDtlList=trvlDtlList.map(item => item.trvlFrom === "Other" ? {...item, trvlFromDisplayName: item.trvlFrom + " (" + item.otherCityTravelFrom + ")"} : {...item, trvlFromDisplayName:item.trvlFrom})
	trvlDtlList=trvlDtlList.map(item => item.trvltTo === "Other" ? {...item, trvltToDisplayName: item.trvltTo + " (" + item.otherCityTravelTo + ")"} : {...item, trvltToDisplayName:item.trvltTo})
	data.trvlDtlList=trvlDtlList;


	let trvlHotelList=data.trvlHotelList;
	trvlHotelList=trvlHotelList.map(item => item.cityName === "Other" ? {...item, cityDisplayName: item.cityName + " (" + item.otherCity + ")"} : {...item, cityDisplayName:item.cityName})
	data.trvlHotelList=trvlHotelList;

	let trvlFoodList=data.trvlFoodList;
	trvlFoodList=trvlFoodList.map(item => item.cityName === "Other" ? {...item, cityDisplayName: item.cityName + " (" + item.otherCity + ")"} : {...item, cityDisplayName:item.cityName})
	data.trvlFoodList=trvlFoodList;

	// const data = [];
	// data[0]=response.data.data;

	return data;
});

export const saveTravelClaim = createAsyncThunk('travelClaim/empTravelClaim/saveTravelClaim', async (travelClaim, thunkAPI) => {
	thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.post(api.travelClaim.create, travelClaim);
	const data = await response.data;
	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push({
			pathname: '/app/employee-service/travel-claim'
		});
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data;
});



const empTravelClaimSlice = createSlice({
	name: 'travelClaim/empTravelClaim',
	initialState: null,
	reducers: {
		newTravelClaim: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					"id": null,
					"trvlDtlList": [
						{
							"trvlDate": "",
							"trvlFrom": "",
							"trvltTo": "",
							"modeOfTravel": "",
							"trvlKm": "",
							"trvlAmt": "0",
							"attachmentId": "",
							"othModeOfTravel": ""
						}
					],
					"trvlHotelList": [
						{
							"hotelName": "",
							"cityCode": "",
							"trvltFrom": "",
							"trvltTo": "",
							"noOfDays": null,
							"trvlAmt": "0",
							"attachmentId": null,
							"thdGstin": "",
							"billNo": "",
							"taxAmt": "0",
							"taxAmtTotal": "0"
						}
					],
					"trvlFoodList": [
						{
							"restaurantName": "",
							"fhdDate": "",
							"cityCode": "",
							"cityName": "",
							"noOfDays": "",
							"foodAmt": "0",
							"attachmentId": null,
							"invoiceNo": ""
						}
					],
					"trvlOthBillList": [
						{
							"othBillTypeCode": "",
							"othBillTypeName": "",
							"billDesc": "",
							"othBillAmt": "0",
							"attachmentId": null
						}
					]
				}
			})
		}
	},
	extraReducers: {
		[getTravelClaim.fulfilled]: (state, action) => action.payload,
		[saveTravelClaim.fulfilled]: (state, action) => action.payload
	}
});

export const { newTravelClaim } = empTravelClaimSlice.actions;

export default empTravelClaimSlice.reducer;
