import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import _ from "@lodash";
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getPayLocalConveyance = createAsyncThunk('localConveyance/empPayLocalConveyance/getPayLocalConveyance', async params => {
    console.log("params", params);
    console.log("uuid", params.uuid);
    const response = await axios.get(api.localConveyance.getById + params.localConveyanceId);
    const data = await response.data.data;
    let createdBy = data.createdBy;
    const responseCreatedByData = await axios.get(api.auth.getUserDetail + createdBy);
    let createdByData = await responseCreatedByData.data.data;
    data.fullname = createdByData[0].fullname;
    data.designation = createdByData[0].designation;
    data.department = createdByData[0].department;
    data.location = createdByData[0].location;

    return data;
});

export const savePayLocalConveyance = createAsyncThunk('localConveyance/empPayLocalConveyance/savePayLocalConveyance', async (localConveyance, thunkAPI) => {
    thunkAPI.dispatch(showSplash({ state: true }));
    const response = await axios.post(api.localConveyance.updateByCashier, localConveyance);
    const data = await response.data;
    if (response) {
        thunkAPI.dispatch(hideSplash({ state: false }));
    }

    if (data.status == "200") {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
        history.push({
            pathname: '/app/cashier-requests/local-claim-cashier'
        });
    } else {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
    }
    return data;
});

const empPayLocalConveyanceAdapter = createEntityAdapter({});


const empPayLocalConveyanceSlice = createSlice({
    name: 'localConveyance/empPayLocalConveyance',
    initialState: empPayLocalConveyanceAdapter.getInitialState({
        nextApprovers: []
    }),
    reducers: {
        newPayLocalConveyance: {
            reducer: (state, action) => action.payload,
            prepare: event => ({
                payload: {
                    nextApprovers: []
                }
            })
        }
    },
    extraReducers: {
        [getPayLocalConveyance.fulfilled]: (state, action) => action.payload,
        [savePayLocalConveyance.fulfilled]: (state, action) => action.payload,

    }
});

export const { newPayLocalConveyance } = empPayLocalConveyanceSlice.actions;

export default empPayLocalConveyanceSlice.reducer;
