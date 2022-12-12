import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@core/utils';
import api from '@api';
import history from '@history';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';

export const getNewEmpCorner = createAsyncThunk('emp-corner/empCornerForm/getNewEmpCorner', async topicId => {
    //console.log("params",params);
    const response = await axios.get(api.empCorner.getByIdTopic + '/' + topicId);
    const data = await response.data.data;
    // const data = [];
    // data[0]=response.data.data;
    return data;
});
export const getCommentById = createAsyncThunk('emp-corner/empCornerForm/getNewCommentById', async commentId => {
    //console.log("params",params);
    const response = await axios.get(api.empCorner.getByIdComment + '/' + commentId);
    const data = await response.data.data;
    // const data = [];
    // data[0]=response.data.data;
    return data;
});

export const saveNewEmpCorner = createAsyncThunk('emp-corner/empCornerForm/saveNewEmpCorner', async (params, thunkAPI) => {
    let response;
    if (params.type == 'save') {
        response = await axios.post(api.empCorner.saveTopic, params.data);
    } else {
        response = await axios.put(api.empCorner.updateTopic + '/' + params.data.topicId, params.data);
    }
    const data = await response.data;
    if (data.status == "200") {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
        history.push({
            pathname: '/app/empCorner/list'
        });
    } else {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
    }
    return data.data;
});

export const saveComment = createAsyncThunk('emp-corner/empCornerForm/saveNewComment', async (empCorner, thunkAPI) => {
    const response = await axios.post(api.empCorner.saveComment, empCorner);
    const data = await response.data;
    if (data.status == "200") {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
    } else {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
    }

    return data;
});
export const UpdateComment = createAsyncThunk('emp-corner/empCornerForm/UpdateComment', async ({ commentId, comment }, thunkAPI) => {
    const response = await axios.put(api.empCorner.updateComment + '/' + commentId, comment);
    const data = await response.data;
    if (data.status == "200") {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
        history.push({
            pathname: '/app/empCorner/list'

        });
    } else {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
    }

    return data;
});
export const saveReport = createAsyncThunk('emp-corner/empCornerForm/saveNewReport', async (report, thunkAPI) => {
    const response = await axios.post(api.empCorner.saveReport, report);
    const data = await response.data;
    if (data.status == "200") {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
    } else {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
    }

    return data;
});
export const deleteComment = createAsyncThunk('emp-corner/empCornerForm/DeleteComments', async (id, thunkAPI) => {
    const response = await axios.delete(api.empCorner.deleteComment + '/' + id);
    const data = await response.data;
    if (data.status == "200") {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
        history.push({
            pathname: '/app/empCornerReport/list'
        });
    } else {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
    }

    return data;
});
export const deleteTopic = createAsyncThunk('emp-corner/empCornerForm/DeleteTopic', async (id, thunkAPI) => {
    const response = await axios.delete(api.empCorner.deleteTopic + '/' + id);
    const data = await response.data;
    if (data.status == "200") {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
        history.push({
            pathname: '/app/empCornerReport/list'
        });
    } else {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
    }

    return data;
});
export const topicLikes = createAsyncThunk('emp-corner/empCornerForm/saveNewTopicLike', async (topicId, thunkAPI) => {
    const response = await axios.post(api.empCorner.topicLikes, { "topicId": topicId });
    const data = await response.data;
    if (data.status == "200") {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));
        const response = await axios.get(api.empCorner.getByIdTopic + '/' + topicId);
        const data = await response.data.data;
        // const data = [];
        // data[0]=response.data.data;
        return data;

    } else {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
    }
    return data;
});
export const CommentLikes = createAsyncThunk('emp-corner/empCornerForm/saveNewCommentLike', async (id, thunkAPI) => {
    const response = await axios.post(api.empCorner.commentLikes, { "commentId": id });
    const data = await response.data;
    if (data.status == "200") {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'success' }));

    } else {
        thunkAPI.dispatch(showMessage({ message: data.message, variant: 'error' }));
    }
    return data;
});

const empCornerFormSlice = createSlice({
    name: 'emp-corner/empCornerForm',
    initialState: null,
    reducers: {
        newEmpCornerRequest: {
            reducer: (state, action) => action.payload,
            prepare: event => ({
                payload: {
                    id: null,
                    topicTitle: "",
                    topicDesc: "",
                    topicAttachFileName: ""
                }
            })
        }
    },
    extraReducers: {
        [getNewEmpCorner.fulfilled]: (state, action) => action.payload,
        [getCommentById.fulfilled]: (state, action) => action.payload,
        [saveNewEmpCorner.fulfilled]: (state, action) => action.payload,
        [saveComment.fulfilled]: (state, action) => action.payload,
        [deleteComment.fulfilled]: (state, action) => action.payload,
        [topicLikes.fulfilled]: (state, action) => action.payload,
        [deleteTopic.fulfilled]: (state, action) => action.payload,
    }
});

export const { newEmpCornerRequest } = empCornerFormSlice.actions;

export default empCornerFormSlice.reducer;
