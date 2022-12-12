import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { closeDialog, openDialog } from 'app/store/core/dialogSlice';
import _ from '@lodash';
import dateFunc from '@common/utils/dateFunc';
import VerticalLinearStepper from './innerPage'
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
}));


function History({data}) {
    
	const dispatch = useDispatch();

    return (
        <Button
            onClick={()=> dispatch(openDialog({
                children: (
                    <>
                        <DialogTitle id="alert-dialog-title">History</DialogTitle>
                        <DialogContent>
                            {data && <VerticalLinearStepper data={data}/>}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=> dispatch(closeDialog())} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </>
                    ),
                    fullWidth: true,
                    maxWidth:"md"
                }))}
            variant="contained"
            color="primary"
        >
            History
        </Button>
    )
}

export default History;
