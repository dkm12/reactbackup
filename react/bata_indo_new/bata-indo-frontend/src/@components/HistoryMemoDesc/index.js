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
import SearchIcon from '@material-ui/icons/Search';

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
  rootHistory: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
},
}));

function VerticalLinearStepper({data}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <div className={classes.root}>
      <Stepper orientation="vertical">
        {data  && _.isArray(data) && data.map((history, index) => (
          <Step key={index} active={true}>
            <StepLabel></StepLabel>
            <StepContent>
                <TableContainer component={Paper}>
                    <Table style={{ tableLayout: 'fixed' }} className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="left">Actioned By</TableCell>
                            <TableCell align="left">Old Description</TableCell>
                            <TableCell align="left">Updated Description</TableCell>
                         </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                            <TableCell component="th" scope="row">
                                {dateFunc.changeDate(history.createdOn)}
                            </TableCell>
                            <TableCell align="left">{history.activityOwnerName}</TableCell>
                            <TableCell align="left"><div dangerouslySetInnerHTML={{ __html: history.oldDesc }} /></TableCell>
                            <TableCell align="left"><div dangerouslySetInnerHTML={{ __html: history.updatedDesc }} /></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
            </StepContent>
          </Step>
        ))}
        {data  && _.isArray(data) && data.length === 0 && 
        <>
         <div className={classes.rootHistory} align="center">
            <SearchIcon className="mt-48" color="primary" style={{ fontSize: 72 }} />
            <Typography variant="h6" gutterBottom>No Description Changes Found</Typography>
        </div>
        </>
        
        }
      </Stepper>
    </div>
  );
}

function HistoryMemoDesc({data}) {
    
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
            Memo Description Change History
        </Button>
    )
}

export default HistoryMemoDesc;
