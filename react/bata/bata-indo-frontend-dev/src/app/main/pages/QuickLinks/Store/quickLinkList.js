import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getActiveQuickLinks = createAsyncThunk('QuickLink/empQuickLinks/getActiveQuickLinks', async () => {
    const response = await axios.get(api.masterData.quickLink + "?status=active");
    console.log("response>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", response)
    const data = [];
    response.data.data.map((d) => (data.push({ id: d.quickLinksId, ...d })));

    return data;
});
export const getQuickLinks = createAsyncThunk('QuickLink/empQuickLinks/getActiveQuickLinks', async () => {
    const response = await axios.get(api.masterData.quickLink);
    console.log("response>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", response)
    const data = [];
    response.data.data.map((d) => (data.push({ id: d.quickLinksId, ...d })));

    return data;
});


const empQuickLinkAdapter = createEntityAdapter({});

export const { selectAll: selectQuickLink, selectById: selectQuickLinkById } = empQuickLinkAdapter.getSelectors(
    state => state.quickLink.quickLinkList
);

const empQuickLinksSlice = createSlice({
    name: 'quickLink/quickLinkList',
    initialState: empQuickLinkAdapter.getInitialState({
        searchText: '',
    }),
    reducers: {
        setQuickLinkSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: event => ({ payload: event.target.value || '' })
        }
    },
    extraReducers: {
        [getActiveQuickLinks.fulfilled]: empQuickLinkAdapter.setAll,
        [getQuickLinks.fulfilled]: empQuickLinkAdapter.setAll,
    }
});

export const { setQuickLinkSearchText } = empQuickLinksSlice.actions;

export default empQuickLinksSlice.reducer;
