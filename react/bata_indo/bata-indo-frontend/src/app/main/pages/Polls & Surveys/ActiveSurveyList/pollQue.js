import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { closeDialog, openDialog } from 'app/store/core/dialogSlice';
import { withRouter } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import dateFunc from '@common/utils/dateFunc';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'app/store/core/messageSlice';
import { pollSurveyApi } from '../store/pollSurveyApi';
import _ from '@lodash';
import FuseAnimate from '@core/core/Animate';
import SmartForm from '@smart-form';
import { getActivePollList } from '../store/empPollActiveSlice';
import { getCurrentGraphList, selectCurrGraphData } from '../store/graphSlice';
import { Doughnut, Pie } from "react-chartjs-2";
import { chartColors } from "./colors";
import "./styles.css";
import { Label, GetLabel } from '@common/utils/label';
import MydialogForm from './mydialogForm'
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import { red } from '@material-ui/core/colors';

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

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

function PollNow({ data }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    async function handleChildClick() {

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
        <FuseAnimate animation="transition.slideRightIn" delay={300}>
            <Button color='primary'
                onClick={() => handleChildClick()}
                className="whitespace-no-wrap normal-case"
                variant="contained"
                color="primary"
            >
                <Label labelId="BL00392" />
            </Button>
        </FuseAnimate>
    )
}

export default withRouter(PollNow);
