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
        statusArray.push({ value: "Open", title: "Open" });
        statusArray.push({ value: "Save As Draft", title: "Save As Draft" });
        statusArray.push({ value: "Expired", title: "Expired" });
        setMasterData(
            {
                statusData: statusArray,
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
    return (
        <form>
            <Grid container spacing={16}>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="annTitle"
                            name="annTitle"
                            onChange={onInput}
                            value={(formInput.annTitle ?? '')}
                            InputProps={{ disableUnderline: true }}
                            type="text" label={<Label labelId="BL00054" />}>
                        </TextField>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="annPublishTillDateFrom"
                            name="annPublishTillDateFrom"
                            onChange={onInput}
                            value={(formInput.annPublishTillDateFrom ?? '')}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ disableUnderline: true }}
                            type="date" label={<Label labelId="BL00127" />}>
                        </TextField>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="annPublishTillDateTo"
                            name="annPublishTillDateTo"
                            onChange={onInput}
                            value={(formInput.annPublishTillDateTo ?? '')}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ disableUnderline: true }}
                            type="date" label={<Label labelId="BL00128" />}>
                        </TextField>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="annStatus"
                            name="annStatus"
                            onChange={onInput}
                            value={(formInput.annStatus ?? '')}
                            // InputLabelProps={{ shrink: true }}
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