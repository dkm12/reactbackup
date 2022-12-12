import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getLocalConveyanceCashiers = createAsyncThunk('localConveyance/empLocalConveyanceCashiers/getEmpLocalConveyanceCashiers', async param => {
    let postData = {}
    postData.pageNo = param.pgNo
    postData.pageSize = param.pgSize
    if (param.fromAmount) postData.fromAmount = param.fromAmount
    if (param.toAmount) postData.toAmount = param.toAmount
    if (param.claimFromDate) postData.claimFromDate = param.claimFromDate
    if (param.claimToDate) postData.claimToDate = param.claimToDate
    // if (param.createdBy) postData.createdBy = param.createdBy
    if (param.empName && param.empName.value) postData.empName = param.empName.value
    const response = await axios.post(api.localConveyance.forCashierList, postData);
    const formData = [];
    let data = {};
    console.log("response>>>>", response)
    if ('data' in response.data && response.data.data != null) {
        response.data.data.data.map((d) => (formData.push({ id: d.lcId, ...d })));
        data = { 'totalItems': response.data.data.totalItems, 'data': formData }
    }
    else {
        data = { 'totalItems': 0, 'data': [] }
    }
    console.log(data)
    return data;
    // const data = await response.data.data;
    // const data = [];
    // response.data.data.map((d) => (data.push({ id: d.lcId, ...d })));
    // let data = {};
    // if ('data' in response && response.data != null) {
    //     data = response.data;
    // }
    // return data;
});

const empLocalConveyanceCashiersAdapter = createEntityAdapter({});

export const { selectAll: selectLocalConveyanceCashiers, selectById: selectLocalConveyanceCashiersById } = empLocalConveyanceCashiersAdapter.getSelectors(
    state => state.localConveyance.empLocalConveyanceCashiers
);

const empLocalConveyanceCashiersSlice = createSlice({
    name: 'localConveyance/empLocalConveyanceCashiers',
    initialState: empLocalConveyanceCashiersAdapter.getInitialState({
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
        [getLocalConveyanceCashiers.fulfilled]: (state, action) => {
            state.totalRecords = action.payload.totalItems !== null ? action.payload.totalItems : 0;
            empLocalConveyanceCashiersAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
        }



        // (state, action) => {
        //     state.totalRecords = action.payload.dataSize !== null ? action.payload.dataSize : 0;
        //     const dataObj = [];
        //     action.payload.data !== null && action.payload.data.map((d) => (dataObj.push({ id: d.lcId, ...d })));
        //     empLocalConveyanceCashiersAdapter.setAll(state, action.payload.data !== null ? dataObj : []);
        // }
    }
});

export const { setLocalConveyanceCashiersSearchText } = empLocalConveyanceCashiersSlice.actions;

export default empLocalConveyanceCashiersSlice.reducer;
