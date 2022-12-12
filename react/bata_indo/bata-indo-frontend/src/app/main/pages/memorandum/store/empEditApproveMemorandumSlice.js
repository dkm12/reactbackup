import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import _ from "@lodash";
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';
import dateFunc from '@common/utils/dateFunc';

export const getApproveMemorandum = createAsyncThunk('memorandum/empApproveMemorandum/getApproveMemorandum', async params => {
	console.log("params", params);
	console.log("uuid", params.uuid);
	const response = await axios.get(api.memorandum.getById + params.memorandumId);
	const data = await response.data.data;
	let createdBy = data.createdBy;
	const responseCreatedByData = await axios.get(api.auth.getUserDetail + createdBy);
	let createdByData = await responseCreatedByData.data.data;
	data.fullname = createdByData[0].fullname;
	data.designation = createdByData[0].designation;
	data.department = createdByData[0].department;
	data.location = createdByData[0].location;

	let attListArray=[{"attList":[]}];

	if(_.isArray(data.attList))
	{
		attListArray=data.attList.map(itemAtt => {
			return itemAtt.attachmentUrl
		});
	}

	data.attListArray=[{"attList":attListArray}];
	
	const responseAllUsers = await axios.get(api.auth.getAllUsers);
	const dataUsers = await responseAllUsers.data.data;
	data.allUsers=dataUsers;
	
	let approverList=data.approverList;
	let approverHistory = [];
	let historyList=data.historyList;
	historyList.forEach(item => {
		approverHistory.push(
			{
				"approverName" : (dataUsers.find(o => o.employId === item.mhPriorityEmp) !== undefined ? dataUsers.find(o => o.employId === item.mhPriorityEmp).fullname  : "") + " (" + item.mhPriorityEmp + ")",
				"status" : item.status,
				"date" :  dateFunc.changeDate(item.createdOn),
				"remarks" : item.mhRemark,
				"attList" : []
			
			}

			);
	})
	data.approverHistory = approverHistory;
	
	let consentRaised=false;
	let consentReply=false;
	let consentRaisedTo=-1;
	let consentQuery = "";
	let chAnswer="";
	let objConsent=data.consentList.find(o => o.consentRaisedBy === params.uuid)
	if(objConsent !== undefined)
	{
		consentRaised=true;
		consentRaisedTo=objConsent.consentRaisedTo;
		consentQuery=objConsent.mchQuery;
	}

	let objConsentReply=data.consentList.find(o => o.consentRaisedBy === params.uuid && o.status === "REPLIED")
	if(objConsentReply !== undefined)
	{
		consentReply=true;
		chAnswer=objConsent.chAnswer;
	}

	data.consentRaised=consentRaised;
	data.consentRaisedTo=consentRaisedTo;
	data.chAnswer=chAnswer;
	data.consentReply=consentReply;

	data.mchQuery=consentQuery;

	
	return data;
});

export const getNextApprover = createAsyncThunk('memorandum/empApproveMemorandum/getNextApprover', async params => {
	//console.log("response.data",response.data);
	const response = await axios.get(api.auth.leaveEmpRM + params);
	const data = [];

	_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ employId: d.employId, ...d })));

	return data;
});



export const saveApproveMemorandum = createAsyncThunk('memorandum/empApproveMemorandum/saveApproveMemorandum', async (claimRequest, thunkAPI) => {
	thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.post(api.memorandum.runWorkflow, claimRequest);
	const data = await response.data;
	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push({
			pathname: '/app/claim-requests/approve-memorandum'
		});
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data;
});

export const sendConsentMemorandum = createAsyncThunk('memorandum/empApproveMemorandum/sendConsentMemorandum', async (claimRequest, thunkAPI) => {
	thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.post(api.memorandum.sendConsent, claimRequest);
	const data = await response.data;
	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push({
			pathname: '/app/claim-requests/approve-memorandum'
		});
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data;
});

const empApproveMemorandumAdapter = createEntityAdapter({});

const empApproveMemorandumSlice = createSlice({
	name: 'memorandum/empApproveMemorandum',
	initialState: empApproveMemorandumAdapter.getInitialState({
		nextApprovers: []
	}),
	reducers: {
		newApproveMemorandum: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					nextApprovers: []
				}
			})
		}
	},
	extraReducers: {
		[getApproveMemorandum.fulfilled]: (state, action) => action.payload,
		[saveApproveMemorandum.fulfilled]: (state, action) => action.payload,
		[sendConsentMemorandum.fulfilled]: (state, action) => action.payload,
		[getNextApprover.fulfilled]: (state, action) => {
			console.log("action.payload", action.payload);
			state.nextApprovers = (action.payload !== null ? action.payload : []);
		}
	}
});

export const { newApproveMemorandum } = empApproveMemorandumSlice.actions;

export default empApproveMemorandumSlice.reducer;
