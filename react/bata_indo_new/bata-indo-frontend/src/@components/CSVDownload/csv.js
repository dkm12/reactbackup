import _ from '@lodash';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import csv from '@common/utils/excel_icon1.svg';
import axios from 'axios';
import api from '@api';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    csvButton: {
        color: '#e2001a !important',
        display: 'inline-block',
        marginTop: '2.5px',
        cursor: 'pointer'
    },
    csvIcon: {
        maxWidth:"22px",
        cursor: 'pointer',
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


    async function handleClick() {
        // data={props.data} headers={props.header} filename={props.filename+'.csv'}
        let tempData = {}
        tempData.fileName = props.filename
        tempData.columns = props.header
        tempData.data = props.data
        console.log(tempData)
        axios.post(api.downloadCsv, tempData, {responseType: 'blob'}).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', props.filename+'.xlsx'); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    }
    return (
        <div className = {classes.icon1}>
            <img src={csv}  className={classes.csvIcon} /><div className={classes.csvButton} onClick={handleClick} color='primary' >
                <span className="hidden sm:flex">Export to Excel</span>
            </div>
        </div>
    );
}

export default CSVDownloadComp;