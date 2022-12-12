import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { push } from 'react-router-redux';
import FuseUtils from '@core/utils';
import api from '@api';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getQuickLink = createAsyncThunk('QuickLink/empQuickLink/getQuickLink', async params => {
    //console.log("params",params);
    const response = await axios.get(api.masterData.quickLink + '/' + params.quickLinksId);
    const data = await response.data.data;
    console.log('datadddddddd :>> ', data);
    // const data = [];
    // data[0]=response.data.data;
    return data;
});
export const saveQuickLink = createAsyncThunk('QuickLink/empQuickLink/saveQuickLink', async (params, thunkAPI) => {
    console.log("params", params)

    let response;
    if (params.type == 'save') {
        response = await axios.post(api.masterData.quickLink, params.data);
    } else {
        response = await axios.put(api.masterData.quickLink + '/' + params.data.quickLinksId, params.data);
    }
    const data = await response.data;
    if (data.status == "200") {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
        history.push({
            pathname: '/app/master/quickLink/list'
        });
    } else {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
    }
    return data;
});



const empQuickLinkSlice = createSlice({
    name: 'quickLink/quickLinkSave',
    initialState: null,
    reducers: {
        newQuickLink: {
            reducer: (state, action) => action.payload,
            prepare: event => ({
                payload: {
                    "quickLinksTitle": " ",
                    "quickLinksUrl": " ",
                    "status": " ",
                }
            })
        }
    },
    extraReducers: {
        [saveQuickLink.fulfilled]: (state, action) => action.payload,
        [getQuickLink.fulfilled]: (state, action) => action.payload,
    }
});

export const { newQuickLink } = empQuickLinkSlice.actions;

export default empQuickLinkSlice.reducer;
