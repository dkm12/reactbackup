import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import spinner from '@common/utils/spinner.gif';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Label } from '@common/utils/label';
import './Notification.css'
import _ from '@lodash';
import axios from 'axios';
import api from '@api';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { getNotifications, selectNotifications } from './store/empNotificationSlice'


function Notification(props) {
    const dispatch = useDispatch();
    const notifications = useSelector(selectNotifications);
    const [data, setData] = useState(notifications);
    const user = useSelector(({ auth }) => auth.user);

    const [userMenu, setUserMenu] = useState(null);

    const userMenuClick = async (event) => {
        setUserMenu(event.currentTarget);
        axios.post(api.notification.update, {});

    };

    const userMenuClose = () => {
        setUserMenu(null);
    };

    useEffect(() => {
        dispatch(getNotifications());

    }, [])
    useEffect(() => {

        setData(notifications);
    }, [notifications]);

    let totalCount = _.sumBy(data, function (count) { return Number(count.total_not); });

    // let totalCount = data.reduce(function (accumulator, item) {
    //     return accumulator + Number(item.total_not);
    // }, 0);

    return (

        <>
            <Button className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6" onClick={userMenuClick}>
                <div className="hidden md:flex flex-col mx-4 items-end">
                    <Typography component="span" className="normal-case flex">
                        <NotificationsIcon color="primary" fontSize="large" />
                        <span className="count">{totalCount}</span>
                    </Typography>
                </div>
                {/* <ExpandMoreIcon color="primary" fontSize="small" /> */}
            </Button>

            <Popover
                className="Notification-list"
                open={Boolean(userMenu)}
                anchorEl={userMenu}
                onClose={userMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                classes={{
                    paper: 'py-8'
                }}
            >
                <>
                    {/* {data && data[0] && data[0].total_not > 0 && */}
                    < MenuItem component={Link} to="/app/employee-service/approve-local-claim" onClick={userMenuClose} role="button">
                        <ListItemText className="liText" primary={<Label labelId="BL00024" />} />
                        <span class="align-items-center justify-content-center badge badge-primary badge-pill ml-auto">
                            {(data && data[0]) ? data[0].total_not : <img src={spinner} />}
                        </span>
                    </MenuItem>
                    {/* } */}
                    < MenuItem component={Link} to="/app/claim-requests/approve-travel-claim" onClick={userMenuClose} role="button">
                        <ListItemText className="liText" primary={<Label labelId="BL00025" />} />
                        <span class="align-items-center justify-content-center badge badge-primary badge-pill ml-auto">
                            {(data && data[1]) ? data[1].total_not : <img src={spinner} />}
                        </span>
                    </MenuItem>
                    < MenuItem component={Link} to="/app/claim-requests/approve-leaves" onClick={userMenuClose} role="button">
                        <ListItemText className="liText" primary={<Label labelId="BL00173" />} />
                        <span class="align-items-center justify-content-center badge badge-primary badge-pill ml-auto">
                            {(data && data[2]) ? data[2].total_not : <img src={spinner} />}
                        </span>
                    </MenuItem>
                    < MenuItem component={Link} to="/app/claim-requests/approve-advance-imprest" onClick={userMenuClose} role="button">
                        <ListItemText className="liText" primary={<Label labelId="BL00028" />} />
                        <span class="align-items-center justify-content-center badge badge-primary badge-pill ml-auto">
                            {(data && data[3]) ? data[3].total_not : <img src={spinner} />}
                        </span>
                    </MenuItem>
                    < MenuItem component={Link} to="/app/claim-requests/approve-cash-reimbursement" onClick={userMenuClose} role="button">
                        <ListItemText className="liText" primary={<Label labelId="BL00026" />} />
                        <span class="align-items-center justify-content-center badge badge-primary badge-pill ml-auto">
                            {(data && data[4]) ? data[4].total_not : <img src={spinner} />}
                        </span>
                    </MenuItem>

                    < MenuItem component={Link} to="/app/jobs/jobposting/applicants" onClick={userMenuClose} role="button">
                        <ListItemText className="liText" primary={<Label labelId="BL00038" />} />
                        <span class="align-items-center justify-content-center badge badge-primary badge-pill ml-auto">
                            {(data && data[5]) ? data[5].total_not : <img src={spinner} />}
                        </span>
                    </MenuItem>
                    < MenuItem component={Link} to="/app/claim-requests/training-requests" onClick={userMenuClose} role="button">
                        <ListItemText className="liText" primary={<Label labelId="BL00421" />} />
                        <span class="align-items-center justify-content-center badge badge-primary badge-pill ml-auto">
                            {(data && data[6]) ? data[6].total_not : <img src={spinner} />}
                        </span>
                    </MenuItem>
                    < MenuItem component={Link} to="/app/birthday/list" onClick={userMenuClose} role="button">
                        <ListItemText className="liText" primary={<Label labelId="BL00004" />} />
                        <span class="align-items-center justify-content-center badge badge-primary badge-pill ml-auto">
                            {(data && data[7]) ? data[7].total_not : <img src={spinner} />}
                        </span>
                    </MenuItem>
                    < MenuItem component={Link} to="/app/workAnniversary/list" onClick={userMenuClose} role="button">
                        <ListItemText className="liText" primary={<Label labelId="BL00006" />} />
                        <span class="align-items-center justify-content-center badge badge-primary badge-pill ml-auto">
                            {(data && data[8]) ? data[8].total_not : <img src={spinner} />}
                        </span>
                    </MenuItem>

                </>

            </Popover>
        </>
    );
}

export default Notification;
