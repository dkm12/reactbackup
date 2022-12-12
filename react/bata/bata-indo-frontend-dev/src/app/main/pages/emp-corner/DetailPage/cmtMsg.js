import reducer from '@components/EmpCorner/store';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import _ from '@lodash';
import { useDeepCompareEffect } from '@core/hooks';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getNewEmpCorner, saveComment, topicLikes, topicdisLikes, CommentdisLikes, deleteComment, deleteTopic, CommentLikes } from '@components/EmpCorner/store/empCornerFormSlice'

const useStyles = makeStyles(theme => ({
    root2: {
        marginLeft: '100px',
    },
}));
function MydialogForm(props) {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();
    const routeParams = useParams();
    const { topicId } = routeParams;
    const [replyMessage, setMsgData] = useState('');

    async function handleSendMessage() {
        if (!replyMessage || replyMessage.trim() == '') return;
        let lrData = {};
        lrData.commentDesc = replyMessage;
        lrData.topicId = props.topicId;
        lrData.parentCommentId = props.commentId;
        console.log(lrData);
        await dispatch(saveComment(lrData));
        await dispatch(getNewEmpCorner(props.topicId));
        props.handleAccordian(props.commentId)
    }
    async function onInputReplyMessage(val) {
        setMsgData(val)
    }
    return (
        <div  className={classes.root2} >
        <Paper className="flex items-center max-w-512 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
        <Input
            placeholder="Reply Here"
            className="flex flex-1"
            disableUnderline
            fullWidth
            value={replyMessage}
            onInput={event => onInputReplyMessage(event.target.value)}
        // helperText={error ? "Bewteen 2 to 25 characters are allowed" : ""}
        />
        <Icon color="primary" className="pointer"
            onClick={event => handleSendMessage()}
        >send</Icon>
    </Paper></div>
    );
}

export default MydialogForm;