import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';

export const getBirthDayWishes = createAsyncThunk('anniversary/birthday/getEmpBirthDayWishes', async () => {
	const response = await axios.get(api.anniversary.getAllBdayWishes);
	const data = [];
	console.log("response.data.data", response.data);
	if (response.data && response.data.data)
		response.data.data.map((d) => (data.push({ id: d.id, ...d })));
	return data;
});

const birthdayWishesAdapter = createEntityAdapter({});

export const { selectAll: selectbirthdayWishes, selectById: selectbirthdayWishesById } = birthdayWishesAdapter.getSelectors(
	state => state.anniversary.birthdayWishes
);

const birthdayWishesSlice = createSlice({
	name: 'anniversary/birthDay',
	initialState: birthdayWishesAdapter.getInitialState({
		searchText: '',
	}),

	reducers: {
		setbDaySearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getBirthDayWishes.fulfilled]: birthdayWishesAdapter.setAll,
	}
});

export const { setbDaySearchText } = birthdayWishesSlice.actions;

export default birthdayWishesSlice.reducer;