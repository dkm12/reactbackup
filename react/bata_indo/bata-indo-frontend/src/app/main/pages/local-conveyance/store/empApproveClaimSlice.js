import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import _ from "@lodash";
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getApproveClaim = createAsyncThunk('localConveyance/empApproveClaim/getApproveClaim', async params => {
    console.log("params", params);
    console.log("uuid", params.uuid);
    const response = await axios.get(api.localConveyance.getById + params.localConveyanceId);
    const data = await response.data.data;
    data.nextApprover = [];
    if (data.statusCode === "PENDING_WITH_HOD") {
        const responseLcFinanceOne = await axios.get(api.localConveyance.getLocalConveyanceFinanceOne);
        let nextApproverArray = await responseLcFinanceOne.data.data;
        const nextApprover = [];
        _.isArray(nextApproverArray)
            && nextApproverArray.map((d) => (nextApprover.push({ value: d.employId, title: d.fullname + " (" + d.employId + ")" })));
        data.nextApprover = nextApprover;
    }
    if (data.statusCode === "PENDING_WITH_FINANCE_ONE") {
        const responseLcFinanceDir = await axios.get(api.localConveyance.getLocalConveyanceFinanceDir);
        let nextApproverArray = await responseLcFinanceDir.data.data;
        const nextApprover = [];
        _.isArray(nextApproverArray)
            && nextApproverArray.map((d) => (nextApprover.push({ value: d.employId, title: d.fullname + " (" + d.employId + ")" })));
        data.nextApprover = nextApprover;
    }
    if (data.statusCode === "PENDING_WITH_FINANCE_DIR" && data.totalAmt >= 100000) {
        const responseLcPreceidentDir = await axios.get(api.localConveyance.getLocalConveyancePreceidentDir);
        let nextApproverArray = await responseLcPreceidentDir.data.data;
        const nextApprover = [];
        _.isArray(nextApproverArray)
            && nextApproverArray.map((d) => (nextApprover.push({ value: d.employId, title: d.fullname + " (" + d.employId + ")" })));
        data.nextApprover = nextApprover;
    }
    let createdBy = data.createdBy;
    const responseCreatedByData = await axios.get(api.auth.getUserDetail + createdBy);
    let createdByData = await responseCreatedByData.data.data;
    data.fullname = createdByData[0].fullname;
    data.designation = createdByData[0].designation;
    data.department = createdByData[0].department;
    data.location = createdByData[0].location;

    return data;
});

export const getNextApprover = createAsyncThunk('localConveyance/empApproveClaim/getNextApprover', async params => {
    console.log("response.data", response.data);
    const response = await axios.get(api.auth.leaveEmpRM + params);
    const data = [];
    _.isArray(response.data.data) && response.data.data.map((d) => (data.push({ employId: d.employId, ...d })));

    return data;
});

export const saveApproveClaim = createAsyncThunk('localConveyance/empApproveClaim/saveApproveClaim', async (localConveyance, thunkAPI) => {
    thunkAPI.dispatch(showSplash({ state: true }));
    const response = await axios.post(api.localConveyance.runWorkflow, localConveyance);
    const data = await response.data;
    if (response) {
        thunkAPI.dispatch(hideSplash({ state: false }));
    }

    if (data.status == "200") {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
        history.push({
            pathname: '/app/employee-service/approve-local-claim'
        });
    } else {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
    }
    return data;
});

const empApproveClaimAdapter = createEntityAdapter({});


const empApproveClaimSlice = createSlice({
    name: 'localConveyance/empApproveClaim',
    initialState: empApproveClaimAdapter.getInitialState({
        nextApprovers: []
    }),
    reducers: {
        newApproveClaim: {
            reducer: (state, action) => action.payload,
            prepare: event => ({
                payload: {
                    nextApprovers: []
                }
            })
        }
    },
    extraReducers: {
        [getApproveClaim.fulfilled]: (state, action) => action.payload,
        [saveApproveClaim.fulfilled]: (state, action) => action.payload,
        [getNextApprover.fulfilled]: (state, action) => {
            console.log("action.payload", action.payload);
            state.nextApprovers = (action.payload !== null ? action.payload : []);
        }
    }
});

export const { newApproveClaim } = empApproveClaimSlice.actions;

export default empApproveClaimSlice.reducer;
