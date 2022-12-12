import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import _ from "@lodash";
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getPayTravelClaim = createAsyncThunk('travelClaim/empPayTravelClaim/getPayTravelClaim', async params => {
	console.log("params", params);
	console.log("uuid", params.uuid);
	const response = await axios.get(api.travelClaim.getById + params.travelClaimId);
	const data = await response.data.data;
	
	let trvlHotelList=data.trvlHotelList;
	trvlHotelList=trvlHotelList.map(item => item.cityName === "Other" ? {...item, cityDisplayName: item.cityName + " (" + item.otherCity + ")"} : {...item, cityDisplayName:item.cityName})
	data.trvlHotelList=trvlHotelList;

	let trvlFoodList=data.trvlFoodList;
	trvlFoodList=trvlFoodList.map(item => item.cityName === "Other" ? {...item, cityDisplayName: item.cityName + " (" + item.otherCity + ")"} : {...item, cityDisplayName:item.cityName})
	data.trvlFoodList=trvlFoodList;
	
	let createdBy = data.createdBy;
	const responseCreatedByData = await axios.get(api.auth.getUserDetail + createdBy);
	let createdByData = await responseCreatedByData.data.data;
	data.fullname = createdByData[0].fullname;
	data.designation = createdByData[0].designation;
	data.department = createdByData[0].department;
	data.location = createdByData[0].location;

	return data;
});

export const savePayTravelClaim = createAsyncThunk('travelClaim/empPayTravelClaim/savePayTravelClaim', async (claimRequest, thunkAPI) => {
	thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.post(api.travelClaim.updateByCashier, claimRequest);
	const data = await response.data;
	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push({
			pathname: '/app/cashier-requests/travel-claim'
		});
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data;
});

const empPayTravelClaimAdapter = createEntityAdapter({});

const empPayTravelClaimSlice = createSlice({
	name: 'travelClaim/empPayTravelClaim',
	initialState: empPayTravelClaimAdapter.getInitialState({
		nextApprovers: []
	}),
	reducers: {
		newPayTravelClaim: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					nextApprovers: []
				}
			})
		}
	},
	extraReducers: {
		[getPayTravelClaim.fulfilled]: (state, action) => action.payload,
		[savePayTravelClaim.fulfilled]: (state, action) => action.payload
	}
});

export const { newPayTravelClaim } = empPayTravelClaimSlice.actions;

export default empPayTravelClaimSlice.reducer;
