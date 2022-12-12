import React, { useEffect, useState } from 'react';
import Scrollbars from '@core/core/Scrollbars';
import './style.css';
import { TextField } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import wishesApi from '../WorkAnniversary/store/wishesApi';
import { showMessage } from 'app/store/core/messageSlice';
// import InfiniteScroll from "react-infinite-scroll-component";
import { getActivePollList, selectActivePollData } from '../../app/main/pages/Polls & Surveys/store/empPollActiveSlice';
import { pollSurveyApi } from '../../app/main/pages/Polls & Surveys/store/pollSurveyApi';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import { red } from '@material-ui/core/colors';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { closeDialog, openDialog } from 'app/store/core/dialogSlice';
import { Label, GetLabel } from '@common/utils/label';
import MydialogForm from '../../app/main/pages/Polls & Surveys/ActiveSurveyList/mydialogForm'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import NoData from '@components/NoData/NoData';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    dia:{
        ovetflow:'unset'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    contentScroll: {
        overflowY: 'unset'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    tab: {
        width: '150px',
        height: '40px',
        backgroundColor: '#e2001a',
        position: 'absolute',
        top: '-60px',
        left: '0'
    }
});
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6" style={{ color: '#e2001a' }}>{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        minHeight: '400px',
        '& h2': {
            fontSize: '1.6rem',
            fontWeight: '700'
        }
    },
}))(MuiDialogContent);

const GreenRadio = withStyles({
    root: {
        color: red[400],
        '&$checked': {
            color: red[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

function Index() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const activePollList = useSelector(selectActivePollData);
    const [data, setData] = useState(activePollList);
    const totalRecords = useSelector(({ pollSurvey }) => pollSurvey.activePollSlice.totalItems);
    const [dataID, setDataID] = useState(null);
    const [message, setMessage] = useState('');
    const [currentQueNo, setCurrentQueNo] = useState(0);
    const [surveyID, setSurveyID] = useState(null);
    const [optionID, setOptionID] = useState(null);
    const [pollGraph, setpollGraph] = useState([]);
    const [tempRadioVal, setRadioVal] = useState('');

    useEffect(() => {
        let dataCount = {
            'pgNo': 0,
            'pgSize': 10
        }
        dispatch(getActivePollList(dataCount));
    }, [dispatch]);

    useEffect(() => {
        setData(activePollList);
    }, [activePollList]);

    async function handleSaveAns(data) {
        if (!surveyID || !optionID) return;
        let postData = {};
        postData.surveyId = surveyID;
        postData.optionId = optionID;
        let res = await pollSurveyApi.saveAns(postData);
        console.log(res);
        if (res.status == '200') {
            await dispatch(showMessage({ message: res.message, variant: 'success' }));
        }
        else dispatch(showMessage({ message: res.message, variant: 'error' }));
        let dataCount = {
            'pgNo': 0,
            'pgSize': 10
        }
        dispatch(getActivePollList(dataCount));
        let resp = await pollSurveyApi.getGraph(surveyID, postData);
        console.log(resp)
        if (resp.status == '200' && res.data) {
            setpollGraph(resp.data);
            console.log(pollGraph)
        }
        setOptionID(null);
        setRadioVal('');
    }

    function handlePrev() {
        if (currentQueNo > 0) setCurrentQueNo(currentQueNo - 1)
    }

    function handleNext() {
        if (currentQueNo < 2) setCurrentQueNo(currentQueNo + 1)
    }

    function radioCheck(optionId, surveyId, applied) {
        if (applied || optionId == optionID && surveyId == surveyID) {
            setSurveyID(null)
            setOptionID(null)
            setRadioVal('')
        }
        else {
            setSurveyID(surveyId)
            setOptionID(optionId)
            setRadioVal(surveyId + '_' + optionId)
        }
    }

    async function handleChildClick(data) {

        dispatch(openDialog({
            children: (
                <div className={classes.dia}>
                    <DialogTitle id="customized-dialog-title" onClose={() => dispatch(closeDialog())}>
                        <Label labelId="BL00031" />
                    </DialogTitle>
                    <DialogContent dividers>
                        <MydialogForm data={data} />
                    </DialogContent>
                </div>
            ),
            fullWidth: true,
            maxWidth: "md"
        }))
    }
    return (
        <div className="birthday ps">
            <Scrollbars className="birthday-scroll">
            {(totalRecords && totalRecords != 0) ?
                <Grid container spacing={16}>
                    <Grid xs={12} sm={6} className="mt-16">
                        <Link to="/app/poll-survey/active-surveys" color="primary" className="viewAll" align='left'><Label labelId="BL00159" /></Link>
                    </Grid>
                    <Grid xs={12} sm={6}>
                         <div align="right">
                            <IconButton
                                color="primary"
                                disabled={currentQueNo == 0}
                                onClick={handlePrev}>
                                <NavigateBeforeIcon size="small" />
                            </IconButton>
                            <IconButton
                                color="primary"
                                disabled={((totalRecords) && currentQueNo == (totalRecords - 1)) || currentQueNo == 2}
                                onClick={handleNext}>
                                <NavigateNextIcon size="small" />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid> : <NoData page='home'/>}
                {(data) &&
                    data.map((n, ind) => {
                        return (
                            (ind == currentQueNo) &&
                            <div className="wish-box">
                                <div className="flex justify-between flex-wrap p-16 pt-0">
                                    <div className="wish-user flex flex-grow mb-8">
                                        {ind + 1}. {n.question}
                                    </div>
                                    {n.surveyOptions &&
                                        n.surveyOptions.map((opt, i) => {
                                            return (
                                                (opt.surveyOptDesc && opt.surveyOptDesc.trim()) && 
                                                <div className={(n.applied) ? "que-radio disabled" : ((opt.optionId == optionID) ? "que-radio2" : "que-radio")}
                                                    // style={{ backgroundColor: (opt.optionId == optionID) ? '#f6f7f9' : 'green' }} 
                                                    onClick={e => radioCheck(opt.optionId, opt.surveyId, n.applied)}>
                                                    <GreenRadio checked={tempRadioVal === opt.surveyId + '_' + opt.optionId}
                                                        name={opt.surveyId} size='small' />
                                                    {/* {(i+10).toString(36)}. */}
                                                    {opt.surveyOptDesc}
                                                </div>
                                            )
                                        })}
                                </div>
                                <Paper className="flex items-center max-w-512 px-16 py-4 rounded-4" elevation={0}>
                                    {(!n.applied) ? <Button className="mb-8 w-full" component="button" variant="contained" color="primary" size="small" onClick={event => handleSaveAns(n)}>Submit</Button>
                                    : <Button className="mb-8 w-full" component="button" variant="contained" color="primary" size="small" onClick={event => handleChildClick(n)}>View Graph</Button>}
                                </Paper>
                            </div>
                        )
                    })}
            </Scrollbars>
        </div>
    )
}

export default Index
