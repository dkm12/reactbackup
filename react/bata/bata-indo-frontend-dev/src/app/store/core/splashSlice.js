import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	state: false
};
const splashSlice = createSlice({
	name: 'splashscreen',
	initialState,
	reducers: {
		showSplash: (state, action) => {
			state.state = true;
		},
		hideSplash: (state, action) => {
			state.state = null;
		}
	}
});

export const { hideSplash, showSplash } = splashSlice.actions;

export default splashSlice.reducer;
