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
import { Label, GetLabel } from '@common/utils/label';
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
        let statusArray = [];
        statusArray.push({ value: "Approved", title: "Approved" });
        statusArray.push({ value: "Returned", title: "Returned" });
        statusArray.push({ value: "Rejected", title: "Rejected" });
        statusArray.push({ value: "Pending With RM", title: "Pending With RM" });
        statusArray.push({ value: "Pending With User", title: "Pending With User" });
        statusArray.push({ value: "Pending With HOD", title: "Pending With HOD" });
        statusArray.push({ value: "Pending With Treasury Manager", title: "Pending With Treasury Manager" });
        statusArray.push({ value: "Pending With Finance Director", title: "Pending With Finance Director" });
        statusArray.push({ value: "Pending With Company Manager", title: "Pending With Company Manager" });

        let usersData = await masterApi.getAllUsers();
        let data = [];
        _.isArray(usersData)
            && usersData.map((d) => (data.push({ value: d.employId, title: d.fullname + "(" + d.employId + ")" })));


        setMasterData(
            {
                statusData: statusArray,
                users: data
            }
        );
    }
    useEffect(() => {
        getDropdownData();
    }, [dispatch]);

    async function onSearch(evt) {
        evt.preventDefault();
        console.log(formInput)
        props.change(formInput)
    }
    async function onInput(evt) {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue });
    }

    async function onAutocomplete(val, name) {
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
        <Grid container spacing={16}>
            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root}
                        id="claimFromDate"
                        name="claimFromDate"
                        onChange={onInput}
                        value={(formInput.claimFromDate ?? '')}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ disableUnderline: true }} type="date" label={<Label labelId="BL00127" />}>
                    </TextField>
                </Paper>
            </Grid>
            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root}
                        id="claimToDate"
                        name="claimToDate"
                        onChange={onInput}
                        value={(formInput.claimToDate ?? '')}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ disableUnderline: true }} type="date" label={<Label labelId="BL00128" />}>
                    </TextField>
                </Paper>
            </Grid>
            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root}
                        id="fromAmount"
                        name="fromAmount"
                        onChange={onInput}
                        // InputLabelProps={{ shrink: true }}
                        value={(formInput.fromAmount ?? '')}
                        InputProps={{ disableUnderline: true }} type="number" label={<Label labelId="BL00418" />}>
                    </TextField>
                </Paper>
            </Grid>
            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root}
                        id="toAmount"
                        name="toAmount"
                        onChange={onInput}
                        value={(formInput.toAmount ?? '')}
                        // InputLabelProps={{ shrink: true }}
                        InputProps={{ disableUnderline: true }} type="number" label={<Label labelId="BL00419" />}>
                    </TextField>
                </Paper>
            </Grid>
            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root}
                        id="status"
                        name="status"
                        size="small"
                        value={(formInput.status ?? '')}
                        // InputLabelProps={{ shrink: true }}
                        onChange={onInput}
                        InputProps={{ disableUnderline: true }}
                        select label={<Label labelId="BL00194" />}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {_.isArray(masterData.statusData) && masterData.statusData.map(n => {
                            return (
                                <MenuItem value={n.value}>{n.title}</MenuItem>
                            )
                        })}
                    </TextField>
                </Paper>
            </Grid>
            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>

                    <Autocomplete
                        className={classes.root}
                        id="createdBy"
                        name="createdBy"
                        onChange={(e, v) => onAutocomplete(v, 'createdBy')}
                        value={(formInput.createdBy ?? '')}
                        options={_.isArray(masterData.users) && masterData.users}
                        InputProps={{ disableUnderline: true }}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField
                            {...params} InputProps={{ ...params.InputProps, disableUnderline: true }}
                            label={<Label labelId="BL00311" />} />}
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
    );
}

export default SearchFilter;