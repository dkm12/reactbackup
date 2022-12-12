import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import _ from "@lodash";
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getApproveLeave = createAsyncThunk('leaveRequest/empApproveLeave/getApproveLeave', async params => {
	console.log("params",params);
	console.log("uuid",params.uuid);
	const response = await axios.get(api.leaveRequest.getById + params.leaveRequestId);
	const data = await response.data.data;

	if(data.statusCode === "PENDING_WITH_HOD")
	{
		const responseLeaveEmpHR = await axios.get(api.leaveRequest.getLeaveHR);
		let nextApproverArray=await responseLeaveEmpHR.data.data;
		const nextApprover = [];
			 _.isArray(nextApproverArray)
				&& nextApproverArray.map((d) => (nextApprover.push({ value: d.employId, title: d.fullname  + " (" + d.employId + ")" })));
		data.nextApprover=nextApprover;
	}

	let createdBy=data.createdBy;
	const responseCreatedByData = await axios.get(api.auth.getUserDetail + createdBy);
	let createdByData=await responseCreatedByData.data.data;
	data.fullname=createdByData[0].fullname;
	// const data = [];
	// data[0]=response.data.data;

	return data;
});

export const getNextApprover = createAsyncThunk('leaveRequest/empApproveLeave/getNextApprover', async params => {
	//console.log("response.data",response.data);
	const response = await axios.get(api.auth.leaveEmpRM + params);
	const data = [];

	_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ employId: d.employId, ...d })));

	return data;
});



export const saveApproveLeave = createAsyncThunk('leaveRequest/empApproveLeave/saveApproveLeave', async (leaveRequest,thunkAPI) => {
	thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.post(api.leaveRequest.runWorkflow, leaveRequest);
	const data = await response.data;
	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push({
			pathname: '/app/claim-requests/approve-leaves'
		});
		// thunkAPI.dispatch(push('/app/hr-service/approve-leaves'));
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data;
});

const empApproveLeaveAdapter = createEntityAdapter({});

const empApproveLeaveSlice = createSlice({
	name: 'leaveRequest/empApproveLeave',
	initialState: empApproveLeaveAdapter.getInitialState({
		nextApprovers: []
	}),
	reducers: {
		newApproveLeave: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: null,
					createdBy: event.uuid,
					empName: event.userName,
					empCode: event.uuid,
					dsgCode: "",
					dsgName: "",
					dptCode: "",
					dptName: "",
					locCode: "",
					locName: "",
					leaveType: "annualLeave",
					leaveCategory: "",
					leaveFrom: "",
					leaveFrom: "",
					attachment: "",
					outcome: "SAVE",
					pendingWith: -1,
					remarks: "",
					statusName: "",
					statusCode: "",
					nextApprovers: []
				}
			})
		}
	},
	extraReducers: {
		[getApproveLeave.fulfilled]: (state, action) => action.payload,
		[saveApproveLeave.fulfilled]: (state, action) => action.payload,
		[getNextApprover.fulfilled]: (state, action) => {
			console.log("action.payload", action.payload);
			state.nextApprovers = (action.payload !== null ? action.payload : []);
		}
	}
});

export const { newApproveLeave } = empApproveLeaveSlice.actions;

export default empApproveLeaveSlice.reducer;
