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
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

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
        statusArray.push({ value: "PENDING WITH RM", title: "PENDING WITH RM" });
        statusArray.push({ value: "PENDING WITH HOD", title: "PENDING WITH HOD" });
        statusArray.push({ value: "PENDING WITH HR", title: "PENDING WITH HR" });

        let mmTypArray = [];
        mmTypArray.push({ value: "Normal", title: "Normal" });
        mmTypArray.push({ value: "Express", title: "Express" });

        let usersData = await masterApi.getAllUsers();
        let data = [];
        _.isArray(usersData)
            && usersData.map((d) => (data.push({ value: d.employId, title: d.fullname + "(" + d.employId + ")" })));


        setMasterData(
            {
                statusData: statusArray,
                mmTypeData: mmTypArray,
                users: data

            }
        );

        // let catData = await masterApi.getAllActiveTrainingCategory();
        // let catArray = [];
        // _.isArray(catData)
        //     && catData.map((d) => (catArray.push({ value: d.trngCatCode, title: d.trngCatName })));


        // let subCatArray = [];
        // let subCatData = await masterApi.getAllActiveTrainingSubCategory();
        // _.isArray(subCatData)
        //     && subCatData.map((d) => (subCatArray.push({ value: d.trngSubcatCode, title: d.trngSubcatName })));

        // //console.log("cityDropDown", data);
        // //setCities(cityArray);
        // setMasterData(
        //     {
        //         categories: catArray,
        //         subCategories: subCatArray
        //     }
        // );
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
                        id="mmRefNo"
                        name="mmRefNo"
                        onInput={onInput}
                        InputProps={{ disableUnderline: true }}

                        value={(formInput.mmRefNo ?? '')}
                        // InputLabelProps={{ shrink: true }}
                        type="text" label={<Label labelId="BL00237" />}>
                    </TextField>
                </Paper>
            </Grid>

            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root}
                        id="mmTitle"
                        name="mmTitle"
                        onInput={onInput}
                        InputProps={{ disableUnderline: true }}

                        value={(formInput.mmTitle ?? '')}
                        // InputLabelProps={{ shrink: true }}
                        type="text" label={<Label labelId="BL00054" />}>
                    </TextField>
                </Paper>
            </Grid>



            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root}
                        id="mmType"
                        name="mmType"
                        size="small"
                        onChange={onInput}
                        InputProps={{ disableUnderline: true }}

                        value={(formInput.mmType ?? '')}
                        // InputLabelProps={{ shrink: true }}
                        select label={<Label labelId="BL00238" />}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {_.isArray(masterData.mmTypeData) && masterData.mmTypeData.map(n => {
                            return (
                                <MenuItem value={n.value}>{n.title}</MenuItem>
                            )
                        })}
                    </TextField>
                </Paper>
            </Grid>
            {/*

            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root}
                        id="appliedByName"
                        name="appliedByName"
                        size="small"
                        onChange={onInput}
                        InputProps={{ disableUnderline: true }}
                        select label={<Label labelId="BL00184" />}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {_.isArray(masterData.users) && masterData.users.map(n => {
						return (
                            <MenuItem value={n.value}>{n.title}</MenuItem>
                        )})}
                    </TextField>
                </Paper>
            </Grid> */}
            {/* <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root}
                        id="status"
                        name="status"
                        size="small"
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
            </Grid> */}
            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <Autocomplete
                        className={classes.root}
                        id="createdBy"
                        name="createdBy"
                        onChange={(e, v) => onAutocomplete(v, 'createdBy')}
                        // InputLabelProps={{ shrink: true }}
                        value={(formInput.createdBy ?? '')}
                        options={_.isArray(masterData.users) && masterData.users}
                        InputProps={{ disableUnderline: true }}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField
                            {...params} InputProps={{ ...params.InputProps, disableUnderline: true }}
                            label="Full Name" />}
                    />

                </Paper>
            </Grid>
            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root}
                        id="memoFromDate"
                        name="memoFromDate"
                        onChange={onInput}

                        value={(formInput.memoFromDate ?? '')}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ disableUnderline: true }} type="date" label={<Label labelId="BL00127" />}>
                    </TextField>
                </Paper>
            </Grid>
            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root}
                        id="memoToDate"
                        name="memoToDate"
                        onChange={onInput}

                        value={(formInput.memoToDate ?? '')}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ disableUnderline: true }} type="date" label={<Label labelId="BL00128" />}>
                    </TextField>
                </Paper>
            </Grid>
            <Grid xs={12} sm={2}>
                <Button color="primary"
                    className="whitespace-no-wrap normal-case mt-16 ml-12 mb-8"
                    variant="contained" onClick={onSearch}>{<Label labelId="BL00422" />}</Button>
                <Button type="reset" color="primary"
                    className="whitespace-no-wrap normal-case mt-16 ml-10 mb-8"
                    variant="contained" onClick={onClear}>{<Label labelId="BL00423" />}</Button>
            </Grid>
        </Grid>
    );
}

export default SearchFilter;