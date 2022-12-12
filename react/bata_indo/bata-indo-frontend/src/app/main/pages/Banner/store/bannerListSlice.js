import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getBanners = createAsyncThunk('banners/empBanners/getEmpBanners', async obj => {
    const response = await axios.get(api.banner.getAllBanners + "?pageNo=" + obj.page + "&pageSize=" + obj.rowsPerPage);
    let data = {};
    if ('data' in response && response.data != null) {
        data = response.data;
    }

    return data;
});
export const getActiveBanners = createAsyncThunk('banners/empBanners/getActiveBanners', async () => {
    const response = await axios.get(api.banner.getActiveBanners);
    console.log("response>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", response)
    const data = [];
    response.data.data.map((d) => (data.push({ id: d.id, ...d })));

    return data;
});


const empBannerAdapter = createEntityAdapter({});

export const { selectAll: selectBanners, selectById: selectBannersById } = empBannerAdapter.getSelectors(
    state => state.banner.bannerList
);

const empBannesSlice = createSlice({
    name: 'banner/bannerList',
    initialState: empBannerAdapter.getInitialState({
        searchText: '',
        totalRecords: 0
    }),
    reducers: {
        setBannersSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: event => ({ payload: event.target.value || '' })
        }
    },
    extraReducers: {
        [getBanners.fulfilled]: (state, action) => {
            state.totalRecords = action.payload.dataSize !== null ? action.payload.dataSize : 0;
            empBannerAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
        },
        [getActiveBanners.fulfilled]: empBannerAdapter.setAll,
    }
});

export const { setBannersSearchText } = empBannesSlice.actions;

export default empBannesSlice.reducer;
