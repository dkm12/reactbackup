// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import FuseUtils from '@core/utils';
// import api from '@api';
// import { showMessage } from 'app/store/core/messageSlice';

// export const saveNewReport = createAsyncThunk('emp-corner/empCornerForm/saveNewReport', async (params, thunkAPI) => {
//     let response;
//     if (params.type == 'save') {
//         response = await axios.post(api.announcement.save, params.data);
//     }
//     if (data.status == "200") {
//         thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
//     } else {
//         thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
//     }
//     return data.data;
// });

// const empCornerReportSlice = createSlice({
//     name: 'announcement/announcementForm',
//     initialState: null,
//     reducers: {
//         newEmpCornerReportRequest: {
//             reducer: (state, action) => action.payload,
//             prepare: event => ({
//                 payload: {
//                     id: null,
//                     reportedEntityId: "",
//                     reportedEntityType: "",
//                     remark: "",
//                 }
//             })
//         }
//     },
//     extraReducers: {
//         [saveNewReport.fulfilled]: (state, action) => action.payload
//     }
// });

// export const { newEmpCornerReportRequest } = empCornerReportSlice.actions;

// export default empCornerReportSlice.reducer;

import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getEmpCornerReportList = createAsyncThunk('empCorner/empEmpCorner/getEmpCornerReportList', async param => {
    let postData = {}
    postData.pageNo = param.pgNo
    postData.pageSize = param.pgSize
    if (param.reportedEntityType) postData.reportedEntityType = param.reportedEntityType
    if (param.createdByCode) postData.createdByCode = param.createdByCode
    if (param.createdOnFromDate) postData.createdOnFromDate = param.createdOnFromDate
    if (param.createdOnToDate) postData.createdOnToDate = param.createdOnToDate
    const response = await axios.post(api.empCorner.getAllReports, postData);


    const formData = [];
    let data = {};
    console.log("response>>>>", response)
    if ('data' in response.data && response.data.data != null) {
        response.data.data.data.map((d) => (formData.push({ id: d.reportId, ...d })));
        data = { 'totalItems': response.data.data.totalItems, 'data': formData }
    }
    console.log(data)
    return data;

    // const data = {
    //     totalRecords: 0,
    //     data: []
    // };
    // if (response.data) {
    //     response.data.data.data.map((d) => (data.data.push({ id: d.reportId, ...d })));
    //     data.totalRecords = response.data.data.totalItems;
    // }
    // return data;
});

const empNewEmpCornerAdapter = createEntityAdapter({});

export const { selectAll: selectEmpCorners, selectById: selectEmpCornerById } = empNewEmpCornerAdapter.getSelectors(
    state => state.empCorner.empCornerReportList
);

const EmpCornerReportListSlice = createSlice({
    name: 'empCorner/empCornerReportList',
    initialState: empNewEmpCornerAdapter.getInitialState({
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
        [getEmpCornerReportList.fulfilled]: (state, action) => {
            state.totalRecords = action.payload.totalItems !== null ? action.payload.totalItems : 0;
            empNewEmpCornerAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
        }



        // (state, action) => {
        //     state.totalRecords = action.payload.totalRecords !== null ? action.payload.totalRecords : 0;
        //     empNewEmpCornerAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
        // },
    }
});

export const { setEmpCornerSearchText } = EmpCornerReportListSlice.actions;

export default EmpCornerReportListSlice.reducer;
