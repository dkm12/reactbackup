import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { push } from 'react-router-redux';
import FuseUtils from '@core/utils';
import api from '@api';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';
import history from '@history';

export const getBanner = createAsyncThunk('Banner/empBanner/getNewBanner', async params => {
    //console.log("params",params);
    const response = await axios.get(api.banner.getById + '/' + params.id);
    const data = await response.data.data;
    console.log('datadddddddd :>> ', data);
    // const data = [];
    // data[0]=response.data.data;
    return data;
});
export const deleteBanner = createAsyncThunk('Banner/empBanner/DeleteBanner', async (id, thunkAPI) => {
    const response = await axios.delete(api.banner.deleteBanner + '/' + id);
    const data = await response.data;
    if (data.status == "200") {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));

    } else {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
    }

    return data;
});

export const saveBanner = createAsyncThunk('Banner/empBanner/saveBanner', async (params, thunkAPI) => {
    console.log("params", params)
    const response = await axios.post(api.banner.uploadBanner, params.banner);
    const data = await response.data;
    if (data.status == "200") {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
        history.push({
            pathname: '/app/master/banner/list'
        });
    } else {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
    }
    return data;
});



const empBannerSlice = createSlice({
    name: 'banner/bannerSave',
    initialState: null,
    reducers: {
        newBanner: {
            reducer: (state, action) => action.payload,
            prepare: event => ({
                payload: {
                    "imageUrl": " ",
                    "status": " "
                }
            })
        }
    },
    extraReducers: {
        [saveBanner.fulfilled]: (state, action) => action.payload,
        [getBanner.fulfilled]: (state, action) => action.payload,
        [deleteBanner.fulfilled]: (state, action) => action.payload,
    }
});

export const { newBanner } = empBannerSlice.actions;

export default empBannerSlice.reducer;
