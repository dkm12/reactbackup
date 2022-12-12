import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getTrainingList = createAsyncThunk('training/empTrainingLists/getTrainingList', async obj => {
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


	const response = await axios.post(api.training.getAll,params);
	const data = {
		totalRecords: 0,
		data: []
	};
	if(response.data){
		response.data.data.data.map((d) => (data.data.push({ id: d.trngId, ...d})));
		data.totalRecords = response.data.data.totalItems;
		
	}


	return data;
});





const empNewTrainingAdapter = createEntityAdapter({});

export const { selectAll: selectTrainings, selectById: selectTrainingsById } = empNewTrainingAdapter.getSelectors(
	state => state.training.empTrainingLists
);

const empTrainingListsSlice = createSlice({
	name: 'training/empTrainingLists',
	initialState: empNewTrainingAdapter.getInitialState({
		searchText: '',
		totalRecords: 0
	}),
	reducers: {
		setProductsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getTrainingList.fulfilled]: (state, action) => {
			state.totalRecords = action.payload.totalRecords !== null ? action.payload.totalRecords : 0;
			empNewTrainingAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		}
		
	}
});

export const { setTrainingSearchText } = empTrainingListsSlice.actions;

export default empTrainingListsSlice.reducer;
