import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@api';

export const getNotifications = createAsyncThunk('notification/empNotifications/getEmpNotifications', async () => {
	const response = await axios.get(api.notification.getAll);
	// const data = await response.data.data;
	// const data = [];
	// response.data.data.map((d) => (data.push({ id: d.id, ...d })));
	let data = {};
	if ('data' in response && response.data != null) {
		data = response.data;
	}

	return data;
});
// export const updateNotifications = createAsyncThunk('notification/empNotifications/updateNotifications', async () => {
// 	const response = await axios.post(api.notification.update, {});
// 	// const data = await response.data.data;
// 	// const data = [];
// 	// response.data.data.map((d) => (data.push({ id: d.id, ...d })));
// 	// let data = {};
// 	// if ('data' in response && response.data != null) {
// 	// 	data = response.data;
// 	// }

// 	// return data;
// });

const empNotificationAdapter = createEntityAdapter({});

export const { selectAll: selectNotifications, selectById: selectNotificationById } = empNotificationAdapter.getSelectors(
	state => state.notification.empNotification
);

const empNotificationSlice = createSlice({
	name: 'pollSurvey/empPollMasters',
	initialState: empNotificationAdapter.getInitialState({
		searchText: '',
		totalRecords: 0
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
		[getNotifications.fulfilled]: (state, action) => {
			state.totalRecords = action.payload.dataSize !== null ? action.payload.dataSize : 0;
			empNotificationAdapter.setAll(state, action.payload.data !== null ? action.payload.data : []);
		},
	}
});

export const { setNotifica1tionsSearchText } = empNotificationSlice.actions;

export default empNotificationSlice.reducer;
