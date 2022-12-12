import FuseAnimate from '@core/core/Animate';
import FusePageSimple from '@core/core/PageSimple';
import FuseLoading from '@core/core/Loading';
import reducer from '@components/EmpCorner/store';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import _ from '@lodash';
import { useDeepCompareEffect } from '@core/hooks';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useState } from 'react';
import SmartForm from '@smart-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import MuiDialogContent from '@material-ui/core/DialogContent';
import GroupIcon from '@material-ui/icons/Group';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import CommentIcon from '@material-ui/icons/Comment';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ReportIcon from '@material-ui/icons/Report';
import Divider from '@material-ui/core/Divider';
import dateFunc from '@common/utils/dateFunc';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Report from './Report'
import { getNewEmpCorner, saveComment, topicLikes, topicdisLikes, CommentdisLikes, deleteComment, deleteTopic, CommentLikes } from '@components/EmpCorner/store/empCornerFormSlice'
import { Button, IconButton } from '@material-ui/core';
import { Label, GetLabel } from '@common/utils/label';
import MydialogForm from './cmtMsg'
const useStyles = makeStyles(theme => ({
    root2: {
        marginLeft: '100px',
        marginTop: '-40px'
    },
    layoutHeader: {
        height: 320,
        minHeight: 320,
        [theme.breakpoints.down('md')]: {
            height: 240,
            minHeight: 240
        }
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    more: {
        marginLeft: '8px',
        cursor: 'pointer'
    },
    date: {
        fontSize: '1.2rem',
        color: '#999',
        marginBottom: '16px'
    },
    avatar: {
        background: '#f6f7f9',
        color: '#e2001a',
        border: '1px solid rgba(0, 0, 0, 0.12)',
    },
    commentAction: {
        display: 'block',
        fontSize: '1.2rem',
        color: '#999',
        marginTop: '4px',
        '& button': {
            fontSize: '1.2rem',
            color: '#999'
        },
        '& button:hover': {
            background: 'transparent',
        },
        '& a': {
            color: '#e2001a',
            fontSize: '1.2rem',
        },
        '& a:hover': {
            textDecoration: 'none',
        }
    },
}));

function DetailPage(props) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();
    const empCorner = useSelector(({ empCorner }) => empCorner.empCornerForm);
    const routeParams = useParams();
    const role = useSelector(({ auth }) => auth.user.role);
    const uuid = useSelector(({ auth }) => auth.user.uuid);
    const { topicId } = routeParams;
    const [dataID, setDataID] = useState(null);

    useDeepCompareEffect(() => {
        async function updateProductState() {
            console.log("routeParams", routeParams);
            if (topicId !== 'new') {
                dispatch(getNewEmpCorner(topicId));
            }
        }
        updateProductState();
    }, [dispatch, routeParams]);
    const DialogContent = withStyles((theme) => ({
        root: {
            padding: theme.spacing(2),
            minHeight: '400px',
            overflowWrap: 'break-word',
            '& h2': {
                fontSize: '1.6rem',
                fontWeight: '700',
                marginBottom: '4px'
            }
        },
    }))(MuiDialogContent);
    let template = {
        layout: { column: 1, spacing: 2, size: 'medium', label: 'fixed' },
        description: 'Post Comments',
        sections: [
            {
                id: 'Comments',
                fields: [{
                    type: 'text',
                    id: 'commentDesc',
                    name: 'commentDesc',
                    title: 'Comments',
                    maxlength: 151,
                    pattern: {
                        value: /[A-Za-z]{2}/,
                        message: "Invalid text"
                    },
                    maxLength: {
                        value: 150,
                        message: 'Maximum 150 characters are allowed.'
                    },
                    validationProps: {
                        required: 'This is a mandatory field'
                    },
                }],
            }
        ],
    };
    async function onSubmit(values) {
        console.log(values);
        if (values.button.toUpperCase() === "POST") {
            let lrData = {};

            lrData.commentDesc = values.data.commentDesc;
            lrData.topicId = empCorner.topicId;
            console.log(lrData);
            await dispatch(saveComment(lrData));
            await dispatch(getNewEmpCorner(topicId));
        }
    }
    async function handleTopicLikes(id, isDisliked) {
        console.log('hello', empCorner.comments)
        if (isDisliked) {
            await handleTopicdisLikes(id)
        }
        await dispatch(topicLikes(id));
        await dispatch(getNewEmpCorner(topicId));
    }
    async function handleTopicdisLikes(id, isLiked) {
        console.log('hello', empCorner.comments)
        if (isLiked) {
            await handleTopicLikes(id)
        }
        await dispatch(topicdisLikes(id));
        await dispatch(getNewEmpCorner(topicId));
    }
    async function handleLikeComment(id, isDisliked) {
        console.log('likeComment>>>>', id)
        if (isDisliked) {
            await handledisLikeComment(id)
        }
        await dispatch(CommentLikes(id, topicId));
        await dispatch(getNewEmpCorner(topicId));
    }
    async function handledisLikeComment(id, isLiked) {
        console.log('likeComment>>>>', id)
        if (isLiked) {
            await handleLikeComment(id)
        }
        await dispatch(CommentdisLikes(id, topicId));
        await dispatch(getNewEmpCorner(topicId));
    }
    async function handleAccordian(id) {
        if (dataID == id) { setDataID(null); }
        else { setDataID(id); }
    }
    return (
        ((empCorner && empCorner.topicId && routeParams.topicId.toString() !== empCorner.topicId.toString())) ?
            <FuseLoading />
            :
            <FusePageSimple
                classes={{
                    toolbar: 'px-16 sm:px-24',
                }}
                header={
                    (
                        <div className="flex flex-1 w-full items-center justify-between">
                            <div className="flex flex-col items-start max-w-full">
                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography
                                        className="normal-case flex items-center sm:mb-12"
                                        component={Link}
                                        role="button"
                                        to="/app/empCorner/list"
                                        color="inherit"
                                    >
                                        <Icon className="text-20">
                                            {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                                        </Icon>
                                        <span className="mx-4"><Label labelId="BL00030" /></span>
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        <GroupIcon className="text-32" />
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
                                            <Label labelId="BL00030" />
                                        </Typography>
                                    </FuseAnimate>
                                </div>
                            </div>

                        </div>
                    )
                }
                content={
                    <div className="p-16 sm:p-24">
                        {topicId !== 'new' && empCorner && empCorner.topicId &&
                            <div>
                                {/* <div style={{ position: 'absolute', right: '24px' }}>
                                    {role.includes("ADMIN") &&

                                        <IconButton aria-label="delete" onClick={event => handleDeleteTopic(empCorner.topicId)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                </div> */}
                                <DialogContent className={classes.root}>
                                    <Typography component="h2" variant="body1">{empCorner.topicTitle}</Typography>
                                    <Typography component="span" className={classes.date}>
                                        {empCorner.createdByName}
                                    </Typography>
                                    <Typography component="span" className={classes.date}>
                                        <ScheduleIcon className="ml-8" style={{ fontSize: 14, marginTop: '-2px' }} /> {dateFunc.getHoursFromDate(empCorner.createdOn)}
                                    </Typography>
                                    <Typography component="span" className={classes.commentAction}>
                                        <IconButton aria-label="like" className="pl-0 pr-4 py-0" onClick={event => handleTopicLikes(empCorner.topicId, empCorner.isDisliked)}>
                                            <ThumbUpAltIcon color={empCorner.isLiked === true ? 'primary' : 'fd3f'} className="mr-2" style={{ fontSize: 14, marginTop: '-2px' }} />
                                            {/* <Label labelId="BL00156" /> */}
                                        </IconButton>({empCorner.topicLikesCount})
                                        <IconButton aria-label="like" className="pl-0 pr-4 py-0" onClick={event => handleTopicdisLikes(empCorner.topicId, empCorner.isLiked)}>
                                            <ThumbDownAltIcon color={empCorner.isDisliked === true ? 'primary' : 'fd3f'} className="mr-2" style={{ fontSize: 14, marginTop: '-2px' }} />
                                            {/* <Label labelId="BL00156" /> */}
                                        </IconButton>({empCorner.topicDislikesCount})

                                        <CommentIcon className="ml-8" style={{ fontSize: 14, marginTop: '-2px' }} />  <Label labelId="BL00216" /> ({empCorner.commentCount})
                                        <Report id={empCorner.topicId} type='Topic' />
                                    </Typography>
                                    {empCorner && empCorner.topicAttachFileName && (
                                        <img src={empCorner.topicAttachFileName} style={{ maxWidth: '600px', margin: '20px auto' }} />
                                    )}
                                    <Typography className="my-16">
                                        {empCorner.topicDesc}
                                    </Typography>
                                    <Divider className="my-8" />
                                    <Typography variant="h2" className="my-16">Comments ({empCorner.commentCount})</Typography>
                                    <div className="my-16">
                                        {empCorner.comments.map((a) => {
                                            return (
                                                <>
                                                    <List className={classes.root}>
                                                        <ListItem>
                                                            <ListItemAvatar>
                                                                {
                                                                    a.createdByName === null ?
                                                                        <Avatar className={classes.avatar}>
                                                                            {a.createdByName}
                                                                        </Avatar> :
                                                                        <Avatar className={classes.avatar}>
                                                                            {a.createdByName.charAt(0)}
                                                                        </Avatar>
                                                                }

                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={<div>
                                                                    <Typography>{a.commentDesc}</Typography>
                                                                    {/* <div style={{ position: 'absolute', right: '24px' }}>
                                                                    {role.includes("ADMIN") &&

                                                                        <IconButton aria-label="delete" onClick={event => handleDeleteComment(a.commentId)}>
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    }
                                                                </div> */}
                                                                </div>}
                                                                secondary={
                                                                    <div>
                                                                        <Typography component="span" className={classes.date}>
                                                                            {a.createdByName}
                                                                        </Typography>
                                                                        <div className={classes.date}>
                                                                            <ScheduleIcon className="ml-8" style={{ fontSize: 14, marginTop: '-2px' }} /> {dateFunc.getHoursFromDate(a.createdOn)}
                                                                            <Typography component="span" className={classes.commentAction}>

                                                                                <IconButton aria-label="like" className="pl-0 pr-4 py-0" onClick={event => handleLikeComment(a.commentId, a.isDisliked)}>
                                                                                    <ThumbUpAltIcon color={a.isLiked === true ? 'primary' : 'null'} className="mr-2" style={{ fontSize: 14, marginTop: '-2px' }} />
                                                                                </IconButton>({a.commentLikesCount})
                                                                                <IconButton aria-label="like" className="pl-0 pr-4 py-0" onClick={event => handledisLikeComment(a.commentId, a.isLiked)}>
                                                                                    <ThumbDownAltIcon color={a.isDisliked === true ? 'primary' : 'null'} className="mr-2" style={{ fontSize: 14, marginTop: '-2px' }} />
                                                                                    {/* <Label labelId="BL00156" /> */}
                                                                                </IconButton>({a.commentDislikesCount})
                                                                                <IconButton aria-label="comment" className="pl-0 pr-4 py-0" onClick={event => handleAccordian(a.commentId)}>
                                                                                    <CommentIcon className="ml-8" style={{ fontSize: 14, marginTop: '-2px' }} />
                                                                                    <Label labelId="BL00216" />({a.replyCount})
                                                                                </IconButton>
                                                                                <Report
                                                                                    id={a.commentId}
                                                                                    type='COMMENT'
                                                                                />
                                                                            </Typography>

                                                                        </div>
                                                                    </div>
                                                                }
                                                            />
                                                        </ListItem>
                                                    </List>
                                                    {a.reply.map((temp) => {
                                                        return (
                                                            <List className={classes.root2}>
                                                                <ListItem>
                                                                    <ListItemText
                                                                        primary={<div>
                                                                            <Typography>{temp.commentDesc}</Typography>
                                                                        </div>}
                                                                        secondary={
                                                                            <div className={classes.date}>
                                                                                <Typography component="span" className={classes.date}>
                                                                                    {temp.createdByName}
                                                                                </Typography>
                                                                                <ScheduleIcon className="ml-8" style={{ fontSize: 14, marginTop: '-2px' }} /> {dateFunc.getHoursFromDate(temp.createdOn)}
                                                                            </div>}
                                                                    />
                                                                </ListItem>
                                                            </List>
                                                        )
                                                    })}
                                                    {(a.commentId == dataID) &&
                                                        <MydialogForm commentId={a.commentId} topicId={a.topicId} handleAccordian={handleAccordian}/>
                                                    }
                                                </>
                                            )
                                        })}
                                    </div>
                                    <Divider className="my-8" />
                                    <div >
                                        <SmartForm
                                            template={template}
                                            onSubmit={onSubmit}
                                            buttons={['Post']}
                                        />
                                    </div>
                                </DialogContent>
                            </div>}
                    </ div>
                }
            />
    );
}
export default withReducer('empCorner', reducer)(DetailPage);
