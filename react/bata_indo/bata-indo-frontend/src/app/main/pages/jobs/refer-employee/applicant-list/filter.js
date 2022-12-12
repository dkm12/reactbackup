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
    const [userdata, setUsers] = useState([]);
    const [statusdata] = useState([{title:'Referred'}, {title: 'Shortlisted'}, {title:'Not Shortlisted'}, {title:'Selected'}, {title:'Not Selected'}, {title:'Joined'}, {title:'Not Joined'}]);
    const [formInput, setFormInput] = useReducer((state, newState) => ({ ...state, ...newState }), {});

    async function getDropdownData() {
        let usersData = await masterApi.getAllUsersData();
        const temp = [];
        _.isArray(usersData)
            && usersData.map((d) => (temp.push({ value: d.employId, title: d.fullname })));
        setUsers(temp);
    }
    useEffect(() => {
        getDropdownData();
    }, [dispatch]);

    async function onSearch(evt) {
        evt.preventDefault();
        console.log(formInput)
        props.change(formInput)
    }
    function onClear(val) {
        setFormInput({ ['jrtFullName']: '', ['jrtStatus']: '', ['jrtReffByName']: '', ['referredOnFromDate']: '', ['referredOnToDate']: ''});
        props.change({})
    }
    async function onInput(evt) {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue });
    }
    async function onAutocomplete(val, name) {
        setFormInput({ [name]: val });
    }
    return (
        <form>
            <Grid container spacing={16}>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="jrtFullName"
                            name="jrtFullName"
                            onInput={onInput}
                            value={(formInput.jrtFullName ?? '')}
                            // InputLabelProps={{ shrink: true }}
                            InputProps={{ disableUnderline: true }}
                            type="text" label="Job Title">
                        </TextField>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <Autocomplete
                            className={classes.root}
                            id="jrtReffByName"
                            name="jrtReffByName"
                            onChange={(e,v) => onAutocomplete(v,'jrtReffByName')}
                            value={(formInput.jrtReffByName ?? '')}
                            options={userdata}
                            InputProps={{ disableUnderline: true }}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => <TextField
                                {...params} InputProps={{...params.InputProps, disableUnderline: true }}
                                  label="Referred By"  />}
                        />
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="jrtStatus"
                            name="jrtStatus"
                            value={(formInput.jrtStatus ?? '')}
                            // InputLabelProps={{ shrink: true }}
                            InputProps={{ disableUnderline: true }}
                            onChange={onInput}
                            select label="Current Status">
                            <MenuItem value="">
                                <em>--Select--</em>
                            </MenuItem>
                            {statusdata.map(n => {
                                return (
                                    <MenuItem value={n.title}>{n.title}</MenuItem>
                                )
                            })}
                        </TextField>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="referredOnFromDate"
                            name="referredOnFromDate"
                            value={(formInput.referredOnFromDate ?? '')}
                            onChange={onInput}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ disableUnderline: true }} type="date" label="From Date">
                        </TextField>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="referredOnToDate"
                            name="referredOnToDate"
                            value={(formInput.referredOnToDate ?? '')}
                            onChange={onInput}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ disableUnderline: true }} type="date" label="To Date">
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