import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getLocalClaimHistorys = createAsyncThunk('localConveyance/empLocalClaimHistorys/getEmpLocalClaimHistorys', async params => {
    const responseLR = await axios.get(api.localConveyance.getById + params.localConveyanceId);
    const dataLR = await responseLR.data.data;
    let trxNo = dataLR.trxNo;
    const response = await axios.post(api.travelClaim.getWorkflowHistory,
        {
            "trxNo": trxNo,
            "startWith": "0",
            "dataSize": "10",
            "sortBy": "activityStartDate"
        }
    );
    // const data = await response.data.data;
    const data = [];
    console.log("response.data.data", response.data);
    response.data.data.map((d) => (data.push({ id: d.id, ...d })));

    return data;
});

const empLocalClaimHistorysAdapter = createEntityAdapter({});

export const { selectAll: selectLocalClaimHistorys, selectById: selectLovalClaimHistorysById } = empLocalClaimHistorysAdapter.getSelectors(
    state => state.localConveyance.empLocalClaimHistorys
);

const empLocalClaimHistorysSlice = createSlice({
    name: 'localConveyance/empLocalClaimHistorys',
    initialState: empLocalClaimHistorysAdapter.getInitialState({
        searchText: ''
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
        [getLocalClaimHistorys.fulfilled]: empLocalClaimHistorysAdapter.setAll
    }
});

export const { setLocalClaimHistorysSearchText } = empLocalClaimHistorysSlice.actions;

export default empLocalClaimHistorysSlice.reducer;
