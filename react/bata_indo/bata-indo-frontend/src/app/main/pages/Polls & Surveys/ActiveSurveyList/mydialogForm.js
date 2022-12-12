import _ from '@lodash';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { showMessage } from 'app/store/core/messageSlice';
import { pollSurveyApi } from '../store/pollSurveyApi';
import { getActivePollList } from '../store/empPollActiveSlice';
import { Doughnut, Pie } from "react-chartjs-2";
import { chartColors } from "./colors";
import "./styles.css";
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import { red } from '@material-ui/core/colors';

const GreenRadio = withStyles({
    root: {
        color: red[400],
        '&$checked': {
            color: red[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

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
    queGraph: {
        marginTop: '40px'
    },
    queRadio2: {
        width: '100%',
        cursor: 'pointer',
        marginBottom: '8px',
        border: '1px solid #ddd',
        background: '#ddd',
        borderRadius: '4px',
        maxWidth: '512px',
        padding: '8px',
        '&:hover': {
            border: '1px solid #ccc',
            background: '#ddd',
            cursor: 'pointer'
        },
        '& input[type="radio"]': {
            marginRight: '4px'
        }
    },
    queRadio: {
        width: '100%',
        cursor: 'pointer',
        marginBottom: '8px',
        border: '1px solid #ddd',
        background: '#f6f7f9',
        borderRadius: '4px',
        maxWidth: '512px',
        padding: '8px',
        '&:hover': {
            border: '1px solid #ccc',
            background: '#ddd',
            cursor: 'pointer'
        },
        '& input[type="radio"]': {
            marginRight: '4px'
        }
    }
}));

function MydialogForm({ data }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [radioVal, setradioVal] = useState('');
    const routeParams = useParams();
    const [surveyID, setsurveyID] = useState('');
    const [optionID, setoptionID] = useState('');
    const [loadGraph, setloadGraph] = useState(false);
    const [pieData, setpieData] = useState({});

    async function getGraph() {
        setloadGraph(true)
        console.log('enter')
        let temp_percent = []
        let resp = await pollSurveyApi.getGraph(data.surveyId)
        console.log(resp)
        if (resp.status == '200' && resp.data) {
            let temp = []
            await resp.data.map((graph, i) => {
                if (graph.pollpercentage) {
                    temp_percent.push(graph.pollpercentage.toFixed(0))
                    temp.push('Option '+(i+10).toString(36).toUpperCase())
                }
            })
            // let temp = ['Option: A','Option: B','Option: C','Option: D'];
            setpieData({
                datasets:
                    [{
                        data: temp_percent,
                        backgroundColor: chartColors,
                        hoverBackgroundColor: chartColors
                    }],
                labels: temp,
            });
            console.log(pieData)
        }

    }
    function radioCheck(surveyId, optionId) {
        console.log(optionId)
        console.log(surveyId)
        if (optionId == optionID && surveyId == surveyID) {
            setsurveyID('');
            setoptionID('');
            setradioVal('')
        }
        else {
            setsurveyID(surveyId);
            setoptionID(optionId);
            setradioVal(surveyId + '_' + optionId)
        }
        console.log(radioVal)
    }

    async function handleSaveAns() {
        if (!surveyID || !optionID) { return; }
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
        await getGraph();
        setoptionID("")
        dispatch(getActivePollList(dataCount));
    }

    useEffect(() => {
        if (!loadGraph) getGraph();
    }, [dispatch]);

    return (
        <Grid container spacing={16}>
            <Grid xs={12} sm={6}>
                <Typography variant="h2">{data.title}</Typography>
                <Typography gutterBottom className={classes.date} variant="body2">
                    {data.description}
                </Typography>
                <Typography gutterBottom variant="body2" className="mb-16">
                    Q. {data.question}
                </Typography>
                {data.surveyOptions &&
                    data.surveyOptions.map((opt, i) => {
                        return (
                            (opt.surveyOptDesc && opt.surveyOptDesc.trim()) && <div  className={(opt.optionId == optionID) ? classes.queRadio2 : classes.queRadio}
                            onClick={e => radioCheck(opt.surveyId, opt.optionId)}>
                                    <GreenRadio checked={radioVal == opt.surveyId + '_' + opt.optionId}
                                     name={opt.surveyId} size='small' />
                                {opt.surveyOptDesc}
                            </div>
                        )
                    })}
                <Button className="w-full" component="button" variant="contained" size="small" color="primary" onClick={() => {
                    handleSaveAns();
                }}>Submit</Button>
            </Grid>
            <Grid xs={12} sm={6} className="mt-48">
                <Typography gutterBottom className={classes.queGraph}>
                    {(pieData && pieData && pieData.datasets && pieData.datasets[0] && pieData.datasets[0].data) &&
                        <div style={styles.relative}>
                            <Doughnut data={pieData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                }} />
                        </div>}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default MydialogForm;