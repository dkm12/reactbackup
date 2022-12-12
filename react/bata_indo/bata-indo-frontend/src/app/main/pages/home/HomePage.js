import FuseAnimate from '@core/core/Animate';
import withReducer from 'app/store/withReducer';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import FuseScrollbars from '@core/core/Scrollbars';

import Banner from '@components/Banner';
import MyTasks from '@components/MyTasks';
import Announcement from '@components/Announcement';
import EmpCorner from '@components/EmpCorner';
import WorkAnniversary from '@components/WorkAnniversary';
import Birthday from '@components/Birthday';
import QuickLinks from '@components/QuickLinks';
import CurrentOpening from '@components/CurrentOpening';
import NewJoiner from '@components/NewJoiner';
import { Label, GetLabel } from '@common/utils/label';
import PollsSurvey from '@components/PollsSurvey';


function TabPanel(props) {
    const {
        children, value, index, ...other
    } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <FuseScrollbars
                    enable={true}
                    scrollToTopOnRouteChange={true}
                >
                    {children}
                </FuseScrollbars>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        left: '200px',
        '&::before': {
            content: '""',
            height: '115px',
            display: 'block',
            position: 'absolute',
            top: '0px',
            left: '20px',
            borderLeft: '2px solid #5a5655',
            zIndex: 9
        },
        '&::after': {
            content: '""',
            height: '115px',
            display: 'block',
            position: 'absolute',
            top: '0px',
            right: '20px',
            borderLeft: '2px solid #5a5655',
            zIndex: 9
        },
        [theme.breakpoints.down('lg')]: {
            position: 'static',
            width: '100%',
            height: '100vh',
            display: 'flex',
            '&::before': {
                display: 'none'
            },
            '&::after': {
                display: 'none'
            }
        }
    },
    label: {
        textTransform: 'capitalize',
    },
    loginBox: {
        height: '400px',
        width: '400px',
        backgroundColor: '#fff',
        marginTop: '100px',
        padding: '2rem',
        boxShadow: '0 0px 10px rgb(0 0 0 / 20%)',
        borderTop: '2px solid #e2001a',
        '&::before': {
            content: '""',
            height: '12px',
            width: '12px',
            background: '#b2b2b2',
            display: 'block',
            borderRadius: '50%',
            position: 'absolute',
            top: '110px',
            left: '15px'
        },
        '&::after': {
            content: '""',
            height: '12px',
            width: '12px',
            background: '#b2b2b2',
            display: 'block',
            borderRadius: '50%',
            position: 'absolute',
            top: '110px',
            right: '15px'
        },
        [theme.breakpoints.down('lg')]: {
            '&::before': {
                display: 'none'
            },
            '&::after': {
                display: 'none'
            }
        },
        [theme.breakpoints.down('sm')]: {
            width: 'calc(100% - 32px)',
            margin: 'auto 16px',
            padding: '1rem',
            height: '380px'
        },
        [theme.breakpoints.between('sm', 'lg')]: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: 'auto'
        }
    },
    loginText: {
        fontSize: '14px',
        marginTop: '12px'
    },
    red: {
        color: '#e2001a',
        fontWeight: '500',
        fontSize: '18px'
    },
    paper: {
        borderRadius: '8px !important',
        overflow: 'hidden',
        minHeight: '274px'
    }
}));

function HomePage() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [birthValue, setBirthValue] = useState(0);
    const [pollsValue, setPollsValue] = useState(0);
    const [joinerValue, setJoinerValue] = useState(0);
    const [annsValue, setAnnsValue] = useState(0);

    const handleChangeBirth = (event, newValue) => {
        setBirthValue(newValue);
    }

    const handlePollsQuickLinks = (event, newValue) => {
        setPollsValue(newValue);
    };;

    const handleChangeJoiner = (event, newValue) => {
        setJoinerValue(newValue);
    };

    const handleAnnouncement = (event, newValue) => {
        setAnnsValue(newValue);
    };

    return (
        <div className="w-full">
            <FuseAnimate animation="transition.slideUpIn" delay={200}>
                <div className="flex flex-col md:flex-row sm:p-8 container">
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <MyTasks />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <AppBar position="static" color="transparent" elevation={1} className="mb-2">
                                            <Tabs value={pollsValue} onChange={handlePollsQuickLinks} aria-label="simple tabs example" indicatorColor="primary" style={{ minHeight: '40px' }}>
                                                <Tab label={<Typography variant="subtitle1"><Label labelId="BL00031" /></Typography>} {...a11yProps('POLLS & SURVEYS')} style={{ minHeight: '40px' }} />
                                                <Tab label={<Typography variant="subtitle1"><Label labelId="BL00007" /></Typography>} {...a11yProps('QUICK LINKS')} style={{ minHeight: '40px', minWidth: '144px' }} />
                                            </Tabs>
                                        </AppBar>
                                        <TabPanel value={pollsValue} index={0} style={{ padding: 0 }}>
                                            <PollsSurvey />
                                        </TabPanel>
                                        <TabPanel value={pollsValue} index={1}>
                                            <QuickLinks />
                                        </TabPanel>
                                    </Paper>
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <QuickLinks />
                                    </Paper>
                                </Grid> */}
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Paper style={{
                                        borderRadius: '8px !important',
                                        overflow: 'hidden',
                                        maxHeight: '274px'
                                    }}>
                                        <Banner />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    {/* <Paper className={classes.paper}>
                                        <Announcement />
                                    </Paper> */}
                                    <Paper className={classes.paper}>
                                        <AppBar position="static" color="transparent" elevation={1}>
                                            <Tabs value={annsValue} onChange={handleAnnouncement} aria-label="simple tabs example" indicatorColor="primary" style={{ minHeight: '40px' }}>
                                                <Tab label={<Typography variant="subtitle1"><Label labelId="BL00009" /></Typography>} {...a11yProps('ANNOUNCEMENT')} style={{ minHeight: '40px', minWidth: '112px' }} />
                                                <Tab label={<Typography variant="subtitle1"><Label labelId="BL00030" /></Typography>} {...a11yProps('EMPLOYEE CORNER')} style={{ minHeight: '40px' }} />
                                            </Tabs>
                                        </AppBar>
                                        <TabPanel value={annsValue} index={0} style={{ padding: 0 }}>
                                            <Announcement />
                                        </TabPanel>
                                        <TabPanel value={annsValue} index={1}>
                                            <EmpCorner />
                                        </TabPanel>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <AppBar position="static" color="transparent" elevation={1}>
                                            <Tabs value={birthValue} onChange={handleChangeBirth} aria-label="simple tabs example" indicatorColor="primary" style={{ minHeight: '40px' }}>
                                                <Tab label={<Typography variant="subtitle1"><Label labelId="BL00004" /></Typography>} {...a11yProps('BIRTHDAY')} style={{ minHeight: '40px', minWidth: '104px' }} />
                                                <Tab label={<Typography variant="subtitle1"><Label labelId="BL00006" /></Typography>} {...a11yProps('WORK ANNIVERSARY')} style={{ minHeight: '40px' }} />
                                            </Tabs>
                                        </AppBar>
                                        <TabPanel value={birthValue} index={0} style={{ padding: 0 }}>
                                            <Birthday />
                                        </TabPanel>
                                        <TabPanel value={birthValue} index={1}>
                                            <WorkAnniversary />
                                        </TabPanel>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <AppBar position="static" color="transparent" elevation={1}>
                                            <Tabs value={joinerValue} onChange={handleChangeJoiner} aria-label="simple tabs example" indicatorColor="primary" style={{ minHeight: '40px' }} >
                                                <Tab label={<Label labelId="BL00011" />} {...a11yProps('NEW JOINER')} style={{ minHeight: '40px', minWidth: '124px' }} />
                                                <Tab label={<Label labelId="BL00012" />}{...a11yProps('CURRENT VACCANCIES')} style={{ minHeight: '40px' }} />
                                            </Tabs>
                                        </AppBar>
                                        <TabPanel value={joinerValue} index={0}>
                                            <NewJoiner />
                                        </TabPanel>
                                        <TabPanel value={joinerValue} index={1}>
                                            <CurrentOpening />
                                        </TabPanel>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </FuseAnimate>
        </div>
    );
}

export default HomePage;
