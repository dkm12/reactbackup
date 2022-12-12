import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import _ from "@lodash";
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getApproveClaim = createAsyncThunk('cashReimbursement/empApproveClaim/getApproveClaim', async params => {
	console.log("params", params);
	console.log("uuid", params.uuid);
	const response = await axios.get(api.cashReimbursement.getById + params.cashReimbursementId);
	const data = await response.data.data;
	data.nextApprover = [];
	if (data.statusCode === "PENDING_WITH_HOD") {
		const responseTravelClaimL1 = await axios.get(api.cashReimbursement.getTravelClaimFinanceOne);
		let nextApproverArray = await responseTravelClaimL1.data.data;
		const nextApprover = [];
		_.isArray(nextApproverArray)
			&& nextApproverArray.map((d) => (nextApprover.push({ value: d.employId, title: d.fullname + " (" + d.employId + ")" })));
		data.nextApprover = nextApprover;
	}
	if (data.statusCode === "PENDING_WITH_FINANCE_ONE") {
		const responseTravelClaimL2 = await axios.get(api.cashReimbursement.getTravelClaimFinanceDir);
		let nextApproverArray = await responseTravelClaimL2.data.data;
		const nextApprover = [];
		_.isArray(nextApproverArray)
			&& nextApproverArray.map((d) => (nextApprover.push({ value: d.employId, title: d.fullname + " (" + d.employId + ")" })));
		data.nextApprover = nextApprover;
	}
	if (data.statusCode === "PENDING_WITH_FINANCE_DIR" && data.totalAmt >= 1000000) {
		const responseTravelClaimL2 = await axios.get(api.cashReimbursement.getTravelClaimPreceidentDir);
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

export const getNextApprover = createAsyncThunk('cashReimbursement/empApproveClaim/getNextApprover', async params => {
	//console.log("response.data",response.data);
	const response = await axios.get(api.auth.leaveEmpRM + params);
	const data = [];

	_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ employId: d.employId, ...d })));

	return data;
});



export const saveApproveClaim = createAsyncThunk('cashReimbursement/empApproveClaim/saveApproveClaim', async (claimRequest, thunkAPI) => {
	thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.post(api.cashReimbursement.runWorkflow, claimRequest);
	const data = await response.data;
	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push({
			pathname: '/app/claim-requests/approve-cash-reimbursement'
		});
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data;
});

const empApproveClaimAdapter = createEntityAdapter({});

const empApproveClaimSlice = createSlice({
	name: 'cashReimbursement/empApproveClaim',
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
