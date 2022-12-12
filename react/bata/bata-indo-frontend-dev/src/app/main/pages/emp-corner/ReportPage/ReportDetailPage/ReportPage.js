import FuseAnimate from '@core/core/Animate';
import FusePageSimple from '@core/core/PageSimple';
import FuseLoading from '@core/core/Loading';
import reducer from '@components/EmpCorner/store';
import Icon from '@material-ui/core/Icon';
import _ from '@lodash';
import { useDeepCompareEffect } from '@core/hooks';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import uploadDoc from '@common/utils/uploadDoc';
import withReducer from 'app/store/withReducer';
import React, { useState } from 'react';
import SmartForm from '@smart-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import MuiDialogContent from '@material-ui/core/DialogContent';
import GroupIcon from '@material-ui/icons/Group';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Divider from '@material-ui/core/Divider';
import dateFunc from '@common/utils/dateFunc';
import Input from '@material-ui/core/Input';
import SendIcon from '@material-ui/icons/Send';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { Label, GetLabel } from '@common/utils/label';
import { getNewEmpCorner, saveComment, topicLikes, deleteComment, deleteTopic, CommentLikes } from '@components/EmpCorner/store/empCornerFormSlice'

const useStyles = makeStyles(theme => ({
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
    },
}));

function ReportPage(props) {

    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();
    const empCorner = useSelector(({ empCorner }) => empCorner.empCornerForm);
    const routeParams = useParams();
    const role = useSelector(({ auth }) => auth.user.role);
    const uuid = useSelector(({ auth }) => auth.user.uuid);
    const { topicId, type, commentId } = routeParams;


    useDeepCompareEffect(() => {
        async function updateProductState() {
            console.log("routeParams", commentId);
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
            '& h2': {
                fontSize: '1.6rem',
                fontWeight: '700',
                marginBottom: '4px',
                overflowWrap: 'break-word',
                paddingRight: '100px'
            }
        }
    }))(MuiDialogContent);

    const handleDeleteTopic = (id) => {
        console.log('DeleteTopic>>>', id)
        dispatch(deleteTopic(id));
    }
    const handleDeleteComment = (id) => {
        console.log('DeleteComment>>>', id)
        dispatch(deleteComment(id));
    }
    const handleEditTopic = (id) => {
        console.log('EditTopic>>>', id)
        props.history.push(`/app/empCorner/form/${id}`);
    }
    const handleEditComment = (CommentId, topicId) => {
        console.log('EditComments>>>', CommentId)
        props.history.push(`/app/empCorner/commentform/${CommentId}/${topicId}`);
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
                                        to="/app/empCornerReport/list"
                                        color="inherit"
                                    >
                                        <Icon className="text-20">
                                            {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                                        </Icon>
                                        <span className="mx-4"><Label labelId="BL00218" /></span>
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
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', right: '24px', top: '24px' }}>
                                    {role.includes("ADMIN") &&
                                        <>
                                            <IconButton aria-label="delete" onClick={event => handleEditTopic(empCorner.topicId)}>
                                                <EditSharpIcon color="primary" />
                                            </IconButton>
                                            <IconButton aria-label="delete" onClick={event => handleDeleteTopic(empCorner.topicId)}>
                                                <DeleteIcon color="primary" />
                                            </IconButton>
                                        </>
                                    }
                                </div>
                                <DialogContent className={classes.root}>
                                    {type === 'TOPIC' ? <div style={{ border: '2px solid #e2001a', padding: '10px 5px' }}> <Typography component="h2" variant="body1">{empCorner.topicTitle}</Typography>
                                        <Typography component="span" className={classes.date}>{empCorner.createdByName}</Typography>
                                        <Typography component="span" className={classes.date}>
                                            <ScheduleIcon className="ml-8" style={{ fontSize: 14, marginTop: '-2px' }} /> {dateFunc.getHoursFromDate(empCorner.createdOn)}
                                        </Typography>
                                        {empCorner && empCorner.topicAttachFileName && (
                                            <img src={empCorner.topicAttachFileName} style={{ maxWidth: '600px', margin: '20px auto' }} />
                                        )}
                                        <Typography className="my-16" style={{ overflowWrap: 'break-word' }}>{empCorner.topicDesc}</Typography>
                                    </div> :
                                        <div>
                                            <Typography component="h2" variant="body1">{empCorner.topicTitle}</Typography>
                                            <Typography component="span" className={classes.date}>{empCorner.createdByName}</Typography>
                                            <Typography component="span" className={classes.date}>
                                                <ScheduleIcon className="ml-8" style={{ fontSize: 14, marginTop: '-2px' }} /> {dateFunc.getHoursFromDate(empCorner.createdOn)}
                                            </Typography>
                                            {empCorner && empCorner.topicAttachFileName && (
                                                <img src={empCorner.topicAttachFileName} style={{ maxWidth: '600px', margin: '20px auto' }} />
                                            )}
                                            <Typography className="my-16" style={{ overflowWrap: 'break-word' }}>{empCorner.topicDesc}</Typography>
                                        </div>
                                    }
                                    <Divider className="my-8" />
                                    <Typography variant="h2" className="my-16">Comments ({empCorner.commentCount})</Typography>
                                    <Typography className="my-16">
                                        {empCorner.comments.map((a) => {
                                            return (
                                                <List className={classes.root}>
                                                    {((type === 'COMMENT') && (a.commentId == commentId)) ? <div style={{ border: '2px solid #e2001a', padding: '10px 5px' }}>
                                                        <ListItem className="px-0">
                                                            <ListItemAvatar>
                                                                <Avatar className={classes.avatar}>
                                                                    {
                                                                        a.createdByName === null ?
                                                                            <Avatar className={classes.avatar}>
                                                                                {a.createdByName}
                                                                            </Avatar> :
                                                                            <Avatar className={classes.avatar}>
                                                                                {a.createdByName.charAt(0)}
                                                                            </Avatar>
                                                                    }
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={<div>
                                                                    <Typography style={{ overflowWrap: 'break-word', paddingRight: '100px' }}>{a.commentDesc}</Typography>
                                                                    <div style={{ position: 'absolute', right: '0', top: '0' }}>
                                                                        {role.includes("ADMIN") &&
                                                                            <>
                                                                                <IconButton aria-label="delete" onClick={event => handleEditComment(a.commentId, empCorner.topicId)}>
                                                                                    <EditSharpIcon color="primary" />
                                                                                </IconButton>
                                                                                <IconButton aria-label="delete" onClick={event => handleDeleteComment(a.commentId)}>
                                                                                    <DeleteIcon color="primary" />
                                                                                </IconButton>
                                                                            </>
                                                                        }
                                                                    </div>
                                                                </div>}
                                                                secondary={
                                                                    <>
                                                                        <Typography component="span" className={classes.date}>
                                                                            {a.createdByName}
                                                                        </Typography>
                                                                        <Typography component="span" className={classes.date}>
                                                                            <ScheduleIcon className="ml-8" style={{ fontSize: 14, marginTop: '-4px' }} /> {dateFunc.getHoursFromDate(empCorner.createdOn)}
                                                                        </Typography>
                                                                    </>
                                                                }
                                                            />
                                                        </ListItem>
                                                    </div>
                                                        :
                                                        <div>
                                                            <ListItem className="px-0">
                                                                <ListItemAvatar>
                                                                    <Avatar className={classes.avatar}>
                                                                        {
                                                                            a.createdByName === null ?
                                                                                <Avatar className={classes.avatar}>
                                                                                    {a.createdByName}
                                                                                </Avatar> :
                                                                                <Avatar className={classes.avatar}>
                                                                                    {a.createdByName.charAt(0)}
                                                                                </Avatar>
                                                                        }
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    primary={<div>
                                                                        <Typography style={{ overflowWrap: 'break-word', paddingRight: '100px' }}>{a.commentDesc}</Typography>
                                                                        <div style={{ position: 'absolute', right: '0', top: '0' }}>
                                                                            {role.includes("ADMIN") &&
                                                                                <>
                                                                                    <IconButton aria-label="delete" onClick={event => handleEditComment(a.commentId, empCorner.topicId)}>
                                                                                        <EditSharpIcon color="primary" />
                                                                                    </IconButton>
                                                                                    <IconButton aria-label="delete" onClick={event => handleDeleteComment(a.commentId)}>
                                                                                        <DeleteIcon color="primary" />
                                                                                    </IconButton>
                                                                                </>
                                                                            }
                                                                        </div>
                                                                    </div>}
                                                                    secondary={
                                                                        <>
                                                                            <Typography component="span" className={classes.date}>
                                                                                {a.createdByName}
                                                                            </Typography>
                                                                            <Typography component="span" className={classes.date}>
                                                                                <ScheduleIcon className="ml-8" style={{ fontSize: 14, marginTop: '-4px' }} /> {dateFunc.getHoursFromDate(empCorner.createdOn)}
                                                                            </Typography>
                                                                        </>
                                                                    }
                                                                />
                                                            </ListItem>
                                                        </div>
                                                    }
                                                </List>
                                            )
                                        })}
                                    </Typography>
                                    <Divider className="my-8" />
                                </DialogContent>
                            </div>}

                    </ div>
                }
            />

    );
}


export default withReducer('empCorner', reducer)(ReportPage);
