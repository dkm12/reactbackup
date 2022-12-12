import _ from '@lodash';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useReducer, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import masterApi from '@common/utils/masterApi';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root: {
        width: '100%',
    }
});

function SearchFilter(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const routeParams = useParams();
    const [desigdata, setDesig] = useState([]);
    const [deptdata, setDept] = useState([]);
    const [citydata, setCity] = useState([]);
    const [formInput, setFormInput] = useReducer((state, newState) => ({ ...state, ...newState }), { ['topicTitle']: '', ['topicDesc']: '', ['createdByEmpCode']: '', ['createdOnFromDate']: '', ['createdOnToDate']: '' });

    // async function getDropdownData() {
    //     let dsgList = await masterApi.getAllActivedesignation();
    //     const temp = [];
    //     _.isArray(dsgList)
    //         && dsgList.map((d) => (temp.push({ value: d.dsgCode, title: d.dsgName })));
    //     setDesig(temp);

    //     let dptList = await masterApi.getAllActivedepartments();
    //     const temp7 = [];
    //     _.isArray(dptList)
    //         && dptList.map((d) => (temp7.push({ value: d.dptCode, title: d.dptName })));
    //     setDept(temp7);

    //     let cityData = await masterApi.getAllActiveCities();
    //     const temp9 = [];
    //     _.isArray(cityData)
    //         && cityData.map((d) => (temp9.push({ value: d.cityCode, title: d.cityName })));
    //     setCity(temp9);
    // }
    // useEffect(() => {
    //     getDropdownData();
    // }, [dispatch]);

    async function onSearch(evt) {
        evt.preventDefault();
        console.log("formInput>>>>", formInput)
        props.change(formInput)
    }
    function onClear(val) {
        setFormInput({ ['topicTitle']: '', ['topicDesc']: '', ['createdByEmpCode']: '', ['createdOnFromDate']: '', ['createdOnToDate']: '' });
        props.change({})
    }
    async function onInput(evt) {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue });
    }
    return (
        <form>
            <Grid container spacing={16}>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="topicTitle"
                            name="topicTitle"
                            onChange={onInput}
                            value={(formInput.topicTitle ?? '')}
                            InputProps={{ disableUnderline: true }}
                            type="text" label="Topic Title">
                        </TextField>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="topicDesc"
                            name="topicDesc"
                            onChange={onInput}
                            value={(formInput.topicDesc ?? '')}
                            InputProps={{ disableUnderline: true }}
                            type="text" label="Topic Description">
                        </TextField>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="createdByEmpCode"
                            name="createdByEmpCode"
                            onChange={onInput}
                            value={(formInput.createdByEmpCode ?? '')}
                            InputProps={{ disableUnderline: true }}
                            type="text" label="Employee Code">
                        </TextField>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="createdOnFromDate"
                            name="createdOnFromDate"
                            onChange={onInput}
                            value={(formInput.createdOnFromDate ?? '')}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ disableUnderline: true }}
                            type="date" label="From Date">
                        </TextField>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="createdOnToDate"
                            name="createdOnToDate"
                            onChange={onInput}
                            value={(formInput.createdOnToDate ?? '')}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ disableUnderline: true }}
                            type="date" label=" To Date">
                        </TextField>
                    </Paper>
                </Grid>

                <Grid xs={12} sm={2}>
                    <Button color="primary"
                        className="whitespace-no-wrap normal-case mt-16"
                        variant="contained" onClick={onSearch}>Search</Button>
                    <Button type="reset" color="primary"
                        className="whitespace-no-wrap normal-case mt-16 ml-10"
                        variant="contained" onClick={onClear}>Clear</Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default SearchFilter;