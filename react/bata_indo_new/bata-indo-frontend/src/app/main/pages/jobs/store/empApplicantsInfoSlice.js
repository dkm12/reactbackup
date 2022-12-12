import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';


export const getApplicantInfo = createAsyncThunk('applicants/empApplicantInfo/getApplicantInfo', async ijpRecrId => {
	const response = await axios.get(api.applicants.ijpGetById+'/'+ijpRecrId);
	const data = await response.data.data;
	console.log("data",data);
	// const data = [];
	// data[0]=response.data.data;
	
	return data;
});


export const saveApplicantInfo = createAsyncThunk('applicants/empApplicantInfo/saveApplicantInfo', async (applicantInfo,thunkAPI) => {

	thunkAPI.dispatch(showSplash({ state: true }));
	const response = await axios.post(api.applicants.ijpSave, applicantInfo);
	const data = await response.data;

	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push("/app/jobs/CurrentInternalJobs");
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data;


});


export const saveWorkFlow = createAsyncThunk('applicants/empApplicantInfo/saveWorkFlow', async (applicantInfo,thunkAPI) => {
	
	thunkAPI.dispatch(showSplash({ state: true }));
	console.log("info",applicantInfo);
	const response = await axios.put(api.applicants.ijpRunWorkflow, applicantInfo);
	const data = await response.data;       
	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push('/app/jobs/jobposting/applicants');
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data;
});

const empApplicantsInfoSlice = createSlice({
	name: 'applicants/empApplicantInfo',
	initialState: null,
	reducers: {
		newApplicantRequest: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					jrtJobId: null,
					ijpRecrId: null,
					ijpCurrRoleSince: "",
					ijpTotalExp:"",
					ijpResumeFileName:"",
					ijpEmpRemark:"",
					ijpViewedStatus:"",
					ijpEmpRm:'',
					ijpStatus:"",
					ijpTrxNo:"",
					officialEmailId: "",
                	empCurrentDesigCode: "",
                    empCurrentDeptCode: "",
                	empCurrentLocCode: "",
                	empRmName: null,
                	empRmStatus: null,
                	empRmRemark: null,
                	ijpApproverName: null,
					ijpApproverStatus: null,
					ijpApproverRemark: null,
					ijpTalentHrName: null,
					ijpTalentHrStatus: null,
					ijpTalentHrRemark: null,
					currentStatusCode: "",
					currentStatusName: "",
					pendingWith: ""
					
				}
			})
		}
	},
	extraReducers: {
		[getApplicantInfo.fulfilled]: (state, action) => action.payload,
		[saveApplicantInfo.fulfilled]: (state, action) => action.payload,
		[saveWorkFlow.fulfilled]: (state, action) => action.payload
	}
});

export const { newApplicantRequest } = empApplicantsInfoSlice.actions;

export default empApplicantsInfoSlice.reducer;
