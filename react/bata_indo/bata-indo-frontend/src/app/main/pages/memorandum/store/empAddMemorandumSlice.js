import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { push } from 'react-router-redux';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';
import dateFunc from '@common/utils/dateFunc';
import _ from '@lodash';
export const getMemorandum = createAsyncThunk('memorandum/empAddMemorandum/getMemorandum', async params => {
	const response = await axios.get(api.memorandum.getById + params.memorandumId);
	const data = await response.data.data;

	let createdBy = data.createdBy;
	let approverList=data.approverList;
	let approverListData=[];
	approverList.forEach(item => {
		approverListData.push(item.maPriorityEmp);
	})

	const responseAllUsers = await axios.get(api.auth.getAllUsers);
	const dataUsers = await responseAllUsers.data.data;

	const responseCreatedByData = await axios.get(api.auth.getUserDetail + createdBy);
	let createdByData = await responseCreatedByData.data.data;
	data.fullname = createdByData[0].fullname;
	data.designation = createdByData[0].designation;
	data.department = createdByData[0].department;
	data.location = createdByData[0].location;
	data.approverListData=approverListData;

	let attListArray=[{"attList":[]}];

	if(_.isArray(data.attList))
	{
		attListArray=data.attList.map(itemAtt => {
			return itemAtt.attachmentUrl
		});
	}

	data.attListArray=[{"attList":attListArray}];
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

	let consentList=data.consentList;
	let consentHistory = [];
	consentList.forEach(item => {
		consentHistory.push(
			{
				"consentRaisedBy" : (dataUsers.find(o => o.employId === item.consentRaisedBy) !== undefined ? dataUsers.find(o => o.employId === item.consentRaisedBy).fullname  : "") + " (" + item.consentRaisedBy + ")",
				"consentRaisedDate" : dateFunc.changeDate(item.consentRaisedOn),
				"consentRaisedQuery" : item.mchQuery !== null ? item.mchQuery : "-",
				"consentRaisedTo" : (dataUsers.find(o => o.employId === item.consentRaisedTo) !== undefined ? dataUsers.find(o => o.employId === item.consentRaisedTo).fullname  : "") + " (" + item.consentRaisedTo + ")",
				"consentReply" : item.chAnswer !== null ? item.chAnswer : "-",
				"consentReplyDate" : item.consentRepliedOn !==null ? dateFunc.changeDate(item.consentRepliedOn) : "-",
			
			}

			);
	})

	data.consentHistory = consentHistory;

	// const data = [];
	// data[0]=response.data.data;

	return data;
});

export const saveMemorandum = createAsyncThunk('memorandum/empAddMemorandum/saveMemorandum', async (memorandum, thunkAPI) => {
	thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.post(api.memorandum.create, memorandum);
	const data = await response.data;
	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push({
			pathname: '/app/employee-service/memorandum'
		});
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data;
});



const empAddMemorandumSlice = createSlice({
	name: 'memorandum/empAddMemorandum',
	initialState: null,
	reducers: {
		newMemorandum: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					"id": null
					// ,
					// "mmType" : "Normal",
					// "mmClass": "Standard"
				}
			})
		}
	},
	extraReducers: {
		[getMemorandum.fulfilled]: (state, action) => action.payload,
		[saveMemorandum.fulfilled]: (state, action) => action.payload
	}
});

export const { newMemorandum } = empAddMemorandumSlice.actions;

export default empAddMemorandumSlice.reducer;
