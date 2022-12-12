import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';

export const getWorkAnvsryWishes = createAsyncThunk('anniversary/workAnniversary/getEmpWorkAnvsryWishes', async () => {
    const response = await axios.get(api.anniversary.getAllWorkAnvsryWishes);
    const data = [];
    console.log("response.data.data", response.data);
    if (response.data && response.data.data)
        response.data.data.map((d) => (data.push({ id: d.id, ...d })));

    return data;
});

const workWishesAdapter = createEntityAdapter({});

export const { selectAll: selectworkWishes, selectById: selectworkWishesById } = workWishesAdapter.getSelectors(
    state => state.anniversary.workWishes
);

const workWishesSlice = createSlice({
    name: 'anniversary/workWishes',
    initialState: workWishesAdapter.getInitialState({
        searchText: '',
        totalItems: 0
    }),

    reducers: {
        setworkWishesSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: event => ({ payload: event.target.value || '' })
        }
    },
    extraReducers: {
        [getWorkAnvsryWishes.fulfilled]: workWishesAdapter.setAll
    }
});

export const { setworkWishesSearchText } = workWishesSlice.actions;

export default workWishesSlice.reducer;