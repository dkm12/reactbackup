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
import { Label, GetLabel } from '@common/utils/label';

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
            && usersData.map((d) => (data.push({ value: d.fullname, title: d.fullname + "(" + d.employId + ")" })));

        setMasterData(
            {
                users: data
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
    // function onClear(val) {
    //     setFormInput({ ['createdBy']: '', ['claimFromDate']: '', ['claimToDate']: '', ['fromAmount']: '', ['toAmount']: '' });
    //     props.change({})
    // }
    async function onInput(evt) {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue });
    }
    async function onAutoComplete(val, name) {
        setFormInput({ [name]: val });
    }

    function onClear(val) {
        var newFormInput = {};
        Object.keys(formInput).forEach(function (key) {
            newFormInput[key] = '';
        });
        setFormInput(newFormInput);
        props.change({});
    }
    return (
        <form>
            <Grid container spacing={16}>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="claimFromDate"
                            name="claimFromDate"
                            onChange={onInput}
                            value={(formInput.claimFromDate ?? '')}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ disableUnderline: true }}
                            type="date" label={<Label labelId="BL00127" />}>
                        </TextField>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="claimToDate"
                            name="claimToDate"
                            // placeholder="Type here..."
                            onChange={onInput}
                            value={(formInput.claimToDate ?? '')}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ disableUnderline: true }}
                            type="date" label={<Label labelId="BL00128" />}>
                        </TextField>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="fromAmount"
                            name="fromAmount"
                            // placeholder="Type here..."
                            onChange={onInput}
                            value={(formInput.fromAmount ?? '')}
                            // InputLabelProps={{ shrink: true }}
                            InputProps={{ disableUnderline: true }}
                            type="number" label={<Label labelId="BL00418" />}>
                        </TextField>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="toAmount"
                            name="toAmount"
                            // placeholder="Type here..."
                            onChange={onInput}
                            value={(formInput.toAmount ?? '')}
                            // InputLabelProps={{ shrink: true }}
                            InputProps={{ disableUnderline: true }}
                            type="number" label={<Label labelId="BL00419" />}>
                        </TextField>
                    </Paper>
                </Grid>
                {/* <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="empCode"
                            name="empCode"
                            onChange={onInput}
                            value={(formInput.empCode ?? '')}
                            InputProps={{ disableUnderline: true }}
                            type="text" label="Employee Code">
                        </TextField>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="empName"
                            name="empName"
                            onChange={onInput}
                            value={(formInput.empName ?? '')}
                            InputProps={{ disableUnderline: true }}
                            type="text" label="Empolyee Name">
                        </TextField>

                    </Paper>
                </Grid> */}
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>

                        <Autocomplete
                            className={classes.root}
                            id="empName"
                            name="empName"
                            onChange={(e, v) => onAutoComplete(v, 'empName')}
                            value={(formInput.createdBy ?? '')}
                            options={_.isArray(masterData.users) && masterData.users}
                            InputProps={{ disableUnderline: true }}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => <TextField
                                {...params} InputProps={{ ...params.InputProps, disableUnderline: true }}
                                label={<Label labelId="BL00184" />} />}
                        />

                    </Paper>
                </Grid>

                <Grid xs={12} sm={2}>
                    <Button color="primary"
                        className="whitespace-no-wrap normal-case mt-16"
                        variant="contained" onClick={onSearch}>{<Label labelId="BL00422" />}</Button>
                    <Button type="reset" color="primary"
                        className="whitespace-no-wrap normal-case mt-16 ml-10"
                        variant="contained" onClick={onClear}>{<Label labelId="BL00423" />}</Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default SearchFilter;