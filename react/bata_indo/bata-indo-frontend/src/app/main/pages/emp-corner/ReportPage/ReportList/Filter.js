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
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles({
    root: {
        width: '100%',
    }
});

function SearchFilter(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const routeParams = useParams();
    const [masterData, setMasterData] = useState({});
    const [formInput, setFormInput] = useReducer((state, newState) => ({ ...state, ...newState }), {});

    async function getDropdownData() {
        let usersData = await masterApi.getAllUsers();
        let data = [];
        _.isArray(usersData)
            && usersData.map((d) => (data.push({ value: d.employId, title: d.fullname + "(" + d.employId + ")" })));
        let reportdType = [];
        reportdType.push({ value: "TOPIC", title: "Topic" });
        reportdType.push({ value: "COMMENT", title: "Comment" });
        setMasterData(
            {
                users: data,
                reportData: reportdType,
            }
        );
    }
    useEffect(() => {
        getDropdownData();
    }, [dispatch]);

    async function onSearch(evt) {
        evt.preventDefault();
        console.log("formInput>>>>", formInput)
        props.change(formInput)
    }
    function onClear(val) {
        var newFormInput = {};
        Object.keys(formInput).forEach(function (key) {
            newFormInput[key] = '';
        });
        setFormInput(newFormInput);
        props.change({});
    }
    async function onInput(evt) {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue });
    }
    async function onAutoComplete(evt, data) {
        //console.log("data",evt);
        const name = "createdBy";
        const newValue = data && data.value && data.value !== null ? data.value : "";
        setFormInput({ [name]: newValue });
    }
    return (
        <form>
            <Grid container spacing={16}>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="reportedEntityType"
                            name="reportedEntityType"
                            onChange={onInput}
                            value={(formInput.reportedEntityType ?? '')}
                            InputProps={{ disableUnderline: true }}
                            select label="Reported Type">
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {_.isArray(masterData.reportData) && masterData.reportData.map(n => {
                                return (
                                    <MenuItem value={n.value}>{n.title}</MenuItem>
                                )
                            })}
                        </TextField>
                    </Paper>
                </Grid>
                {/* <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="createdByCode"
                            name="createdByCode"
                            onChange={onInput}
                            value={(formInput.createdByCode ?? '')}
                            InputProps={{ disableUnderline: true }}
                            type="text" label="createdByCode">
                        </TextField>
                    </Paper>
                </Grid> */}
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>

                        <Autocomplete
                            className={classes.root}
                            id="createdByCode"
                            name="createdByCode"
                            onChange={(e, v) => onAutoComplete(v, 'createdByCode')}
                            value={(formInput.createdBy ?? '')}
                            options={_.isArray(masterData.users) && masterData.users}
                            InputProps={{ disableUnderline: true }}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => <TextField
                                {...params} InputProps={{ ...params.InputProps, disableUnderline: true }}
                                label="Employee Name" />}
                        />

                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="createdOnFromDate"
                            name="createdOnFromDate"
                            onChange={onInput}
                            InputLabelProps={{ shrink: true }}
                            value={(formInput.createdOnFromDate ?? '')}
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
                            type="date" label="To Date">
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