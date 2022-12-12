import _ from '@lodash';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import csv from '@common/utils/excel_icon1.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    csvButton: {
        color: '#e2001a !important',
        display: 'inline-block',
        marginTop: '2.5px'
    },
    csvIcon: {
        maxWidth:"22px",
        paddingRight:"5px"
    },
    icon1: {
        display: 'flex',
        color: 'green',
        justifyContent: 'flex-end',
        marginRight:'40px',
        padding: '10px'
     }
}));

function CSVDownloadComp(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const routeParams = useParams();
    const [message, setmessage] = useState('');

    return (
        <div className = {classes.icon1}>
            <img src={csv}  className={classes.csvIcon} /><CSVLink className={classes.csvButton} color='primary' data={props.data} headers={props.header} filename={props.filename+'.csv'}>
                <span className="hidden sm:flex">Export to Excel</span>
            </CSVLink>
        </div>
    );
}

export default CSVDownloadComp;