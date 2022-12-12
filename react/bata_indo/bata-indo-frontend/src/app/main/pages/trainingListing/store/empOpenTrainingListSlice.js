import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getOpenTrainingList = createAsyncThunk('training/empOpenTrainingList/getEmpOpenTrainingList', async obj => {
	let params={
		"pageNo": obj.page,
		"pageSize": obj.rowsPerPage
	};
	if('trngName' in obj.filterData && obj.filterData.trngName !== "") params.trngName=obj.filterData.trngName;
	if('trngCategoryCode' in obj.filterData && obj.filterData.trngCategoryCode !== "") params.trngCategoryCode=obj.filterData.trngCategoryCode;
	if('trngSubCategoryCode' in obj.filterData && obj.filterData.trngSubCategoryCode !== "") params.trngSubCategoryCode=obj.filterData.trngSubCategoryCode;
	if('learningPlatform' in obj.filterData && obj.filterData.learningPlatform !== "") params.learningPlatform=obj.filterData.learningPlatform;
	if('trngPublishDate' in obj.filterData && obj.filterData.trngPublishDate !== "") params.trngPublishDate=obj.filterData.trngPublishDate;
	if('trngPublishTillDateFrom' in obj.filterData && obj.filterData.trngPublishTillDateFrom !== "") params.trngPublishTillDateFrom=obj.filterData.trngPublishTillDateFrom;
	if('trngPublishTillDateTo' in obj.filterData && obj.filterData.trngPublishTillDateTo !== "") params.trngPublishTillDateTo=obj.filterData.trngPublishTillDateTo;


	const response = await axios.post(api.training.openTrainingApplication,params);
	// const data = await response.data.data;
	// const data = [];
	// response.data.data.map((d) => (data.push({ id: d.id, ...d })));
	let data = {};
	if ('data' in response && response.data != null) {
		data = response.data;
	}

	return data;
});

const empOpenTrainingListAdapter = createEntityAdapter({});

export const { selectAll: selectOpenTrainingList, selectById: selectOpenTrainingListById } = empOpenTrainingListAdapter.getSelectors(
	state => state.training.empOpenTrainingList
);

const empOpenTrainingListSlice = createSlice({
	name: 'training/empOpenTrainingList',
	initialState: empOpenTrainingListAdapter.getInitialState({
		searchText: '',
		totalRecords: 0
	}),
	reducers: {
		setOpenTrainingListSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getOpenTrainingList.fulfilled]: (state, action) => {
			console.log("action.payload",action.payload);
			state.totalRecords = action.payload.data.totalItems !== null ? action.payload.data.totalItems : 0;
			const dataObj = [];
			action.payload.data.data !== null && action.payload.data.data.map((d) => (dataObj.push({ id: d.trngId, ...d })));
			
			empOpenTrainingListAdapter.setAll(state, action.payload.data.data !== null ? dataObj : []);
		}
	}
});

export const { setOpenTrainingListSearchText } = empOpenTrainingListSlice.actions;

export default empOpenTrainingListSlice.reducer;
