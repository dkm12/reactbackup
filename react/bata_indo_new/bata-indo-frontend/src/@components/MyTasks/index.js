import React, { useEffect, useState } from 'react';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CardHeading from '@core/core/CardHeading';
import Scrollbars from '@core/core/Scrollbars';
import './style.css'
import spinner from '@common/utils/spinner.gif';
import { useDispatch, useSelector } from 'react-redux';
import { getMyTaskCountList, selectMyTaskCount } from './store/myTaskListSlice';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Label, GetLabel } from '@common/utils/label';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {

    },
    loader: {
        width: '25px',
        height: '25px',
        marginLeft: '42%',
        marginTop: '5%'
    }
}));
function Index() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const taskList = useSelector(selectMyTaskCount);
    const [data, setData] = useState(taskList);

    useEffect(() => {
        dispatch(getMyTaskCountList('url'));
    }, [dispatch]);

    useEffect(() => {
        setData(taskList);
    }, [taskList]);
    return (

        <div className="task-list">
            <CardHeading><Label labelId="BL00008" /></CardHeading>
            <Scrollbars
                className="task-list-scroll"
            >
                {/* {(!data || !data.length) ?
                    <CircularProgress className={classes.loader} /> :
                    data.map(n => {
                        return (
                            <a href="/app/employee-service/local-conveyance" title="">
                                <KeyboardArrowRightIcon fontSize="small" color="primary" />
                                {n.process_name}
                                <span class="align-items-center justify-content-center ml-auto" style={{ marginRight: '15px', color: '#e2001a' }}>
                                    {n.count}
                                </span>
                            </a>
                        )
                    })
                } */}

                <Link to="/app/employee-service/approve-local-claim">
                    {/* <KeyboardArrowRightIcon fontSize="small" color="primary" /> */}
                    <Label labelId="BL00024" />
                    <span class="align-items-center justify-content-center badge badge-primary badge-pill ml-auto">
                        {(data && data[0]) ? data[0].count : <img src={spinner} />}
                    </span>
                </Link>
                <Link to="/app/claim-requests/approve-travel-claim">
                    {/* <KeyboardArrowRightIcon fontSize="small" color="primary" /> */}
                    <Label labelId="BL00025" />
                    <span class="align-items-center justify-content-center badge badge-primary badge-pill ml-auto">
                        {(data && data[1]) ? data[1].count : <img src={spinner} />}
                    </span>
                </Link>
                <Link to="/app/claim-requests/approve-leaves">
                    {/* <KeyboardArrowRightIcon fontSize="small" color="primary" /> */}
                    <Label labelId="BL00173" />
                    <span class="align-items-center justify-content-center badge badge-primary badge-pill ml-auto">
                        {(data && data[2]) ? data[2].count : <img src={spinner} />}
                    </span>
                </Link>
                <Link to="/app/claim-requests/approve-advance-imprest">
                    {/* <KeyboardArrowRightIcon fontSize="small" color="primary" /> */}
                    <Label labelId="BL00028" />
                    <span class="align-items-center justify-content-center badge badge-primary badge-pill ml-auto">
                        {(data && data[3]) ? data[3].count : <img src={spinner} />}
                    </span>
                </Link>
                <Link to="/app/claim-requests/approve-cash-reimbursement">
                    {/* <KeyboardArrowRightIcon fontSize="small" color="primary" /> */}
                    <Label labelId="BL00026" />
                    <span class="align-items-center justify-content-center badge badge-primary badge-pill ml-auto">
                        {(data && data[4]) ? data[4].count : <img src={spinner} />}
                    </span>
                </Link>
            </Scrollbars>
        </div>
    )
}

export default Index
