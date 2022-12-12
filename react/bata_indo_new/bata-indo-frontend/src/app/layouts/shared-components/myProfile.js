import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import { closeDialog, openDialog } from 'app/store/core/dialogSlice';
import Grid from '@material-ui/core/Grid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import _ from '@lodash'

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
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
	},
	head: {
		background: '#f6f7f9'
	},
	paper: {
		position: 'absolute',
		// overflowY: 'scroll',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	noData: {
		color: theme.palette.text.secondary,
		marginLeft: 'auto',
		marginRight: 'auto',
		paddingTop: '16px',
		paddingBottom: '20px',
		fontSize: 'larger',
		fontWeight: 'bold'
	},
	avatar: {
		backgroundColor: red[500],
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	contentScroll: {
		overflowY: 'unset'
	},
	smartForm2: {
		marginTop: '0px',
		marginBottom: '10px',
	},
}));

const DialogTitle = withStyles(useStyles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle className={classes.root} {...other}>
			<Typography>{children}</Typography>
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

function MyProfileDial(props) {
	const classes = useStyles();
    const dispatch = useDispatch();

    return (

        <>
            <DialogTitle id="customized-dialog-title" onClose={() => dispatch(closeDialog())}>
               <Typography variant="h6" style={{ color: '#e2001a' }}>My Profile</Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={() => dispatch(closeDialog())}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers className={classes.contentScroll}>
            <CardHeader
					className={classes.head}
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {(props.data.fullname) ? (props.data.fullname).slice(0, 1) : '-'}{(props.data.fullname.split(" ")).length > 1 ? (props.data.fullname.split(" ")[((props.data.fullname.split(" ")).length)-1]).slice(0,1) : ''}
                        </Avatar>
                    }
                    title={props.data.fullname ?? '--'}
                    subheader={<>
                        <Typography className="mb-8">{props.data.department ?? '--'}</Typography>
                        <Typography className="mb-8"><MailOutlineIcon fontSize="small" /> {props.data.emailId ?? '--'}</Typography>
                        <Typography className="mb-8"><PhoneIcon fontSize="small" /> {props.data.mobNo ?? '--'}</Typography>
                    </>}
                />
                <Divider className="my-8" />
                <Grid container className="px-16 py-4">
					<Grid item xs={12} sm={4}><Typography variant="subtitle1">Employee Code:</Typography></Grid>
					<Grid item xs={12} sm={8}><Typography variant="subtitle2">{props.data.employId ?? '--'}</Typography></Grid>
                </Grid>
                <Grid container className="px-16 py-4">
					<Grid item xs={12} sm={4}><Typography variant="subtitle1">Reporting Manager:</Typography></Grid>
					<Grid item xs={12} sm={8}><Typography variant="subtitle2">{props.data.rmCode ?? '--'}</Typography></Grid>
                </Grid>
                <Grid container className="px-16 py-4">
					<Grid item xs={12} sm={4}><Typography variant="subtitle1">Location:</Typography></Grid>
					<Grid item xs={12} sm={8}><Typography variant="subtitle2">{props.data.location ?? '--'}</Typography></Grid>
                </Grid>
                <Grid container className="px-16 py-4">
					<Grid item xs={12} sm={4}><Typography variant="subtitle1">Designation:</Typography></Grid>
					<Grid item xs={12} sm={8}><Typography variant="subtitle2">{props.data.designation ?? '--'}</Typography></Grid>
                </Grid>
                <Grid container className="px-16 py-4">
					<Grid item xs={12} sm={4}><Typography variant="subtitle1">Date of joining:</Typography></Grid>
					<Grid item xs={12} sm={8}><Typography variant="subtitle2">{(props.data.doj) ?? '--' }</Typography></Grid>
                </Grid>
            </DialogContent>
        </>
    );
}

export default MyProfileDial;