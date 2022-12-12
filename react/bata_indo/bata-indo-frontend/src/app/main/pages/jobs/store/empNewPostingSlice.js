import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getNewPosting = createAsyncThunk('jobs/empJobPosting/getNewPosting', async jbdId => {
	console.log("jbdId",jbdId);
	const response = await axios.get(api.jobs.ijpGetById +'/'+ jbdId);
	const data = await response.data.data;
	// const data = [];
	// data[0]=response.data.data;
	return data;
});

export const saveNewPosting = createAsyncThunk('jobs/empJobPosting/saveNewPosting', async (newJobsParams,thunkAPI) => {
	console.log("hello");
	thunkAPI.dispatch(showSplash({ state: true }));
	let response
	if(newJobsParams.type == 'save'){
		console.log("newJobsParams", newJobsParams.data);
		response = await axios.post(api.jobs.ijpSave, newJobsParams.data);
	}else if(newJobsParams.type == 'update'){
		response = await axios.put(api.jobs.ijpUpdate+'/'+newJobsParams.data.jbdId, newJobsParams.data);
	}else if(newJobsParams.type == 'publish'){
		response = await axios.put(api.jobs.ijpJobPublish+newJobsParams.data.jbdId, {"ijpStatus":"open"});
	}
	const data = await response.data;

	if (response) {
		thunkAPI.dispatch(hideSplash({ state: false }));
	}

	if (data.status == "200") {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		history.push("/app/jobs/jobposting/newpostingLists");
		// history.goBack();
	} else {
		thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	}
	return data;
});

const empNewPostingSlice = createSlice({
	name: 'jobs/empJobPosting',
	initialState: null,
	reducers: {
		newPostingRequest: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					Id: null,
					jbdCode:"",
					jbdTitle:"",
                    jbdDesc:" ",
                    jbdYOExp:"",
					jbdDesigCode:"",
                    jbdDesigName:"",
					jbdDeptCode:"",
                    jbdDeptName:"",
					jbdLocCode:"",
                    jbdLocName:"",
                    jbdPubFrmDate:"",
                    jbdPubToDate:"",
                    jbdNumVacancy:"",
                    jbdAttachId:"",
					jbdApplyEmpCats:"",
				
				}
			})
		}
	},
	extraReducers: {
		[getNewPosting.fulfilled]: (state, action) => action.payload,
		[saveNewPosting.fulfilled]: (state, action) => action.payload
	}
});

export const { newPostingRequest } = empNewPostingSlice.actions;

export default empNewPostingSlice.reducer;
