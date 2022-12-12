import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { useDispatch } from 'react-redux';
import { closeDialog, openDialog } from 'app/store/core/dialogSlice';
import Link from '@material-ui/core/Link';
import dateFunc from '@common/utils/dateFunc';
import { Label } from '@common/utils/label';


const styles = (theme) => ({
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
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
}));

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

function ReadMore({ data }) {

  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Link variant="body2" className={classes.more}
      onClick={() => dispatch(openDialog({
        children: (
          <>
            <DialogTitle id="customized-dialog-title" onClose={() => dispatch(closeDialog())}>
              <Label labelId="BL00009" />
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="h2">{data.annTitle}</Typography>
              <Typography gutterBottom className={classes.date} variant="body2">
                {dateFunc.blogDate(data.createdOn)}
              </Typography>
              {data && data.annAttachId && (
                <img src={data.annAttachId} style={{ width: '60%', margin: '20px auto' }} />
              )}
              <Typography gutterBottom>
                {data.annDesc}
              </Typography>
            </DialogContent>
          </>
        ),
        fullWidth: true,
        maxWidth: "md"
      }))}
    >
      <Label labelId="BL00010" />...
    </Link>
  )
}

export default ReadMore;
