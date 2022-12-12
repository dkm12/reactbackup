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
        statusArray.push({ value: "Pending With Treasury Manager", title: "Pending With Treasury Manager" });
        statusArray.push({ value: "PENDING WITH Finance Director", title: "PENDING WITH Finance Director" });
        statusArray.push({ value: "PENDING WITH Company Manager", title: "PENDING WITH Company Manager" });

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

    async function onAutoComplete(evt,data) {
        //console.log("data",evt);
        const name = "createdBy";
        const newValue = data && data.value && data.value!== null ? data.value : "";
        setFormInput({ [name]: newValue });
    }
    
    return (
        <Grid container spacing={16}>
            {/* <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root}
                        id="trngName"
                        name="trngName"
                        onInput={onInput}
                        InputProps={{ disableUnderline: true }}
                        type="text" label={<Label labelId="BL00379" />}>
                    </TextField>
                </Paper>
            </Grid>
            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root}
                        id="learningPlatform"
                        name="learningPlatform"
                        onInput={onInput}
                        InputProps={{ disableUnderline: true }}
                        type="text" label={<Label labelId="BL00381" />}>
                    </TextField>
                </Paper>
            </Grid>
            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root} 
                        id="trngCategoryCode"
                        name="trngCategoryCode"
                        size="small"
                        onChange={onInput}
                        InputProps={{ disableUnderline: true }} 
                        select label={<Label labelId="BL00365" />}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {_.isArray(masterData.categories) && masterData.categories.map(n => {
						return (
                            <MenuItem value={n.value}>{n.title}</MenuItem>
                        )})}
                    </TextField>
                </Paper>
            </Grid>
            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root} 
                        id="trngSubCategoryCode"
                        name="trngSubCategoryCode"
                        InputProps={{ disableUnderline: true }} 
                        onChange={onInput}
                        select label={<Label labelId="BL00368" />}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {_.isArray(masterData.subCategories) && masterData.subCategories.map(n => {
						return (
                            <MenuItem value={n.value}>{n.title}</MenuItem>
                        )})}
                    </TextField>
                </Paper>
            </Grid> */}
            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root}
                        id="claimFromDate"
                        name="claimFromDate"
                        onChange={onInput}
                        InputProps={{ disableUnderline: true }} type="date">
                    </TextField>
                </Paper>
            </Grid>
            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root}
                        id="claimToDate"
                        name="claimToDate"
                        onChange={onInput}
                        InputProps={{ disableUnderline: true }} type="date">
                    </TextField>
                </Paper>
            </Grid>
            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root}
                        id="fromAmount"
                        name="fromAmount"
                        onChange={onInput}
                        InputProps={{ disableUnderline: true }} type="number" label={<Label labelId="BL00186" />}>
                    </TextField>
                </Paper>
            </Grid>
            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root}
                        id="toAmount"
                        name="toAmount"
                        onChange={onInput}
                        InputProps={{ disableUnderline: true }} type="number" label={<Label labelId="BL00186" />}>
                    </TextField>
                </Paper>
            </Grid>
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
                    {/* <TextField className={classes.root} 
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
                    </TextField> */}

                    <Autocomplete
                    id={"createdBy"}
                    name={"createdBy"}
                    onChange={(e, data) => {
                        onAutoComplete(e,data)
                    }}
                    options={masterData.users}
                    getOptionLabel={(option) => option.title}
                    style={{ width: '100%', minWidth: '135px' }}
                    fullWidth
                    //size={size}
                    renderInput={(params) => <TextField
                        {...params}
                        //label={layout.label !== 'fixed' && title}
                        variant="outlined"
                       // size={size}
                        style={{ minWidth: '75px' }}
                    />}
                    />
                
                </Paper>
            </Grid>
            <Grid xs={12} sm={1}>
                <Button color="primary"
                    className="whitespace-no-wrap normal-case mt-16"
                    variant="contained" onClick={onSearch}>Search</Button>
            </Grid>
        </Grid>
    );
}

export default SearchFilter;