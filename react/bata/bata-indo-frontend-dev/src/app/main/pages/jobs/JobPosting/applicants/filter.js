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
    const [userdata, setUsers] = useState([]);
    const [statusdata] = useState([{title:'Pending with RM'}, {title: 'Pending with IJP Approver'}, {title:'Pending with TALENT HR'}, {title:'Approved'}, {title:'Completed'}, {title:'Rejected'}]);
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
        setFormInput({ ['jbdTitle']: '', ['currentStatusName']: '', ['fullname']: '', ['ijpCreatedOnFromDate']: '', ['ijpCreatedOnToDate']: ''});
        props.change({})
    }
    async function onAutocomplete(val, name) {
        setFormInput({ [name]: val });
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
                            id="jbdTitle"
                            name="jbdTitle"
                            onInput={onInput}
                            value={(formInput.jbdTitle ?? '')}
                            // InputLabelProps={{ shrink: true }}
                            InputProps={{ disableUnderline: true }}
                            type="text" label={<Label labelId="BL00299" />}>
                        </TextField>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <Autocomplete
                            className={classes.root}
                            id="fullname"
                            name="fullname"
                            onChange={(e,v) => onAutocomplete(v,'fullname')}
                            value={(formInput.fullname ?? '')}
                            options={userdata}
                            InputProps={{ disableUnderline: true }}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => <TextField
                                {...params} InputProps={{...params.InputProps, disableUnderline: true }}
                                  label={<Label labelId="BL00079" />}  />}
                        />
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="currentStatusName"
                            name="currentStatusName"
                            value={(formInput.currentStatusName ?? '')}
                            // InputLabelProps={{ shrink: true }}
                            InputProps={{ disableUnderline: true }}
                            onChange={onInput}
                            select label={<Label labelId="BL00089" />}>
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
                            id="ijpCreatedOnFromDate"
                            name="ijpCreatedOnFromDate"
                            value={(formInput.ijpCreatedOnFromDate ?? '')}
                            onChange={onInput}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ disableUnderline: true }} type="date" label={<Label labelId="BL00127" />}>
                        </TextField>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="ijpCreatedOnToDate"
                            name="ijpCreatedOnToDate"
                            value={(formInput.ijpCreatedOnToDate ?? '')}
                            onChange={onInput}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ disableUnderline: true }} type="date" label={<Label labelId="BL00128" />}>
                        </TextField>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Button color="primary"
                        className="whitespace-no-wrap normal-case mt-16"
                        variant="contained" onClick={onSearch}><Label labelId="BL00422" /></Button>
                    <Button type="reset" color="primary"
                        className="whitespace-no-wrap normal-case mt-16 ml-10"
                        variant="contained" onClick={onClear}><Label labelId="BL00423" /></Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default SearchFilter;