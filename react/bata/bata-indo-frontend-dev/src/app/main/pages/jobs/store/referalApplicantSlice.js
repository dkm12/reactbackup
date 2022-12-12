import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getReferalApplicant = createAsyncThunk('applicants/referalApplicant/getReferalApplicant',  async param => {
	let url = {}
	url.pageNo = param.pgNo
	url.pageSize = param.pgSize
	if(param.jrtFullName) url.jrtFullName = param.jrtFullName
	if(param.jrtReffByName) url.jrtReffByName = param.jrtReffByName
	if(param.jrtStatus) url.jrtStatus = param.jrtStatus
	if(param.referredOnFromDate) url.referredOnFromDate = param.referredOnFromDate
	if(param.referredOnToDate) url.referredOnToDate = param.referredOnToDate
	const response = await axios.post(api.applicants.getAll, url);
	const formData = [];
	let data = {};
	if ('data' in response.data && response.data.data != null) {
		response.data.data.data.map((d) => (formData.push({ id: d.jrtRecrId, ...d })));
		data = { 'totalItems': response.data.data.totalItems, 'data': formData }
	}
	console.log(data)
	return data;
});

export const saveApplicants = createAsyncThunk('applicants/referalApplicant/saveApplicants', async (postObj, thunkAPI) => {
	console.log(postObj)
	const response = await axios.post(api.applicants.save, postObj);
	const data = await response.data;
	console.log(data)

	if (data.status == "200") {
		  thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
		  history.goBack();
		  //   history.push('/app/jobs/refer-emp/refapplicants');
	  } else {
		  thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
	  }
	  return data;
});

const referalApplicantAdapter = createEntityAdapter({});

export const { selectAll: selectReferalApplicant, selectById: selectReferalApplicantById } = referalApplicantAdapter.getSelectors(
	state => state.applicants.referalApplicant
);

const referalApplicantSlice = createSlice({
	name: 'applicants/referalApplicant',
	initialState: referalApplicantAdapter.getInitialState({
		searchText: '',
		totalItems: 0
	}),
	
	reducers: {
		setReferalApplicantsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getReferalApplicant.fulfilled]: (state, action) => {
			state.totalItems = action.payload.totalItems !== null ? action.payload.totalItems : 0;
			referalApplicantAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		}
	}
});

export const { setReferalApplicantsSearchText } = referalApplicantSlice.actions;

export default referalApplicantSlice.reducer;