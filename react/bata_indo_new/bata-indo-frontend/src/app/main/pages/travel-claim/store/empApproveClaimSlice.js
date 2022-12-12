import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import _ from "@lodash";
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getApproveClaim = createAsyncThunk('travelClaim/empApproveClaim/getApproveClaim', async params => {
	console.log("params", params);
	console.log("uuid", params.uuid);
	const response = await axios.get(api.travelClaim.getById + params.travelClaimId);
	const data = await response.data.data;

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

	
	data.nextApprover = [];
	// if (data.statusCode === "PENDING_WITH_HOD") {
		// const responseTravelClaimL1 = await axios.get(api.travelClaim.getTravelClaimFinanceOne);
		// let nextApproverArray = await responseTravelClaimL1.data.data;
		// const nextApprover = [];
		// _.isArray(nextApproverArray)
		// 	&& nextApproverArray.map((d) => (nextApprover.push({ value: d.employId, title: d.fullname + " (" + d.employId + ")" })));
		// data.nextApprover = nextApprover;
	// }
	if ((data.statusCode === "PENDING_WITH_HOD" && data.claimedTotalAmt < 1000000) || (data.statusCode === "PENDING_WITH_CLAIM_HR")) {
        const responseTravelClaimL1 = await axios.get(api.travelClaim.getTravelClaimFinanceOne);
		let nextApproverArray = await responseTravelClaimL1.data.data;
		const nextApprover = [];
		_.isArray(nextApproverArray)
			&& nextApproverArray.map((d) => (nextApprover.push({ value: d.employId, title: d.fullname + " (" + d.employId + ")" })));
		data.nextApprover = nextApprover;
    }
    if (data.statusCode === "PENDING_WITH_HOD" && data.claimedTotalAmt >= 1000000) {
        const responseTcClaimHr = await axios.get(api.travelClaim.getClaimHr);
        let nextApproverArray = await responseTcClaimHr.data.data;
        const nextApprover = [];
        _.isArray(nextApproverArray)
            && nextApproverArray.map((d) => (nextApprover.push({ value: d.employId, title: d.fullname + " (" + d.employId + ")" })));
        data.nextApprover = nextApprover;
    }
	if (data.statusCode === "PENDING_WITH_FINANCE_ONE") {
		const responseTravelClaimL2 = await axios.get(api.travelClaim.getTravelClaimFinanceDir);
		let nextApproverArray = await responseTravelClaimL2.data.data;
		const nextApprover = [];
		_.isArray(nextApproverArray)
			&& nextApproverArray.map((d) => (nextApprover.push({ value: d.employId, title: d.fullname + " (" + d.employId + ")" })));
		data.nextApprover = nextApprover;
	}
	if (data.statusCode === "PENDING_WITH_FINANCE_DIR" && data.claimedTotalAmt >= 10000000) {
		const responseTravelClaimL2 = await axios.get(api.travelClaim.getTravelClaimPreceidentDir);
		let nextApproverArray = await responseTravelClaimL2.data.data;
		const nextApprover = [];
		_.isArray(nextApproverArray)
			&& nextApproverArray.map((d) => (nextApprover.push({ value: d.employId, title: d.fullname + " (" + d.employId + ")" })));
		data.nextApprover = nextApprover;
	}
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

export const getNextApprover = createAsyncThunk('travelClaim/empApproveClaim/getNextApprover', async params => {
	//console.log("response.data",response.data);
	const response = await axios.get(api.auth.leaveEmpRM + params);
	const data = [];

	_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ employId: d.employId, ...d })));

	return data;
});



export const saveApproveClaim = createAsyncThunk('travelClaim/empApproveClaim/saveApproveClaim', async (claimRequest, thunkAPI) => {
	thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.post(api.travelClaim.runWorkflow, claimRequest);
	const data = await response.data;
	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push({
			pathname: '/app/claim-requests/approve-travel-claim'
		});
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data;
});

const empApproveClaimAdapter = createEntityAdapter({});

const empApproveClaimSlice = createSlice({
	name: 'travelClaim/empApproveClaim',
	initialState: empApproveClaimAdapter.getInitialState({
		nextApprovers: []
	}),
	reducers: {
		newApproveClaim: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					nextApprovers: []
				}
			})
		}
	},
	extraReducers: {
		[getApproveClaim.fulfilled]: (state, action) => action.payload,
		[saveApproveClaim.fulfilled]: (state, action) => action.payload,
		[getNextApprover.fulfilled]: (state, action) => {
			console.log("action.payload", action.payload);
			state.nextApprovers = (action.payload !== null ? action.payload : []);
		}
	}
});

export const { newApproveClaim } = empApproveClaimSlice.actions;

export default empApproveClaimSlice.reducer;
