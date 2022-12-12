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
import Divider from '@material-ui/core/Divider';
import { useDispatch } from 'react-redux';
import { closeDialog, openDialog } from 'app/store/core/dialogSlice';
import Link from '@material-ui/core/Link';
import dateFunc from '@common/utils/dateFunc';
import Input from '@material-ui/core/Input';
import SendIcon from '@material-ui/icons/Send';


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

function Topic({ data }) {

  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Link variant="body2" className={classes.more}
      onClick={() => dispatch(openDialog({
        children: (
          <>
            <DialogTitle id="customized-dialog-title" onClose={() => dispatch(closeDialog())}>
              Employee Corner
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="h2">{data.topicTitle}</Typography>
              <Typography gutterBottom className={classes.date} variant="body2">
                {dateFunc.blogDate(data.createdOn)}
              </Typography>
              {data && data.topicAttachFileName && (
                <img src={data.topicAttachFileName} style={{ width: '60%', margin: '20px auto' }} />
              )}
              <Typography gutterBottom>
                {data.topicDesc}
              </Typography>
              <Divider className="my-8" />
              <div className="flex flex-1 items-center justify-center px-12">
                <Input
                  placeholder="Type here to reply"
                  className="flex flex-1 mx-8 mt-16"
                  disableUnderline
                  fullWidth
                  inputProps={{
                    'aria-label': 'description'
                  }}
                />
                <SendIcon color="primary" />
              </div>
            </DialogContent>
          </>
        ),
        fullWidth: true,
        maxWidth: "md"
      }))}
    >
      Read more...
    </Link>
  )
}

export default Topic;
