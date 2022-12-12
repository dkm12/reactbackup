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
    const [desigdata, setDesig] = useState([]);
    const [deptdata, setDept] = useState([]);
    const [citydata, setCity] = useState([]);
    const [formInput, setFormInput] = useReducer((state, newState) => ({ ...state, ...newState }), { ['jbdTitle']: '', ['jbdDeptName']: '', ['jbdDesigName']: '', ['jbdPubFrmDate']: '', ['jbdPubToDate']: '' });

    async function getDropdownData() {
        let dsgList = await masterApi.getAllActivedesignation();
        const temp = [];
        _.isArray(dsgList)
            && dsgList.map((d) => (temp.push({ value: d.dsgCode, title: d.dsgName })));
        setDesig(temp);

        let dptList = await masterApi.getAllActivedepartments();
        const temp7 = [];
        _.isArray(dptList)
            && dptList.map((d) => (temp7.push({ value: d.dptCode, title: d.dptName })));
        setDept(temp7);

        let cityData = await masterApi.getAllActiveCities();
        const temp9 = [];
        _.isArray(cityData)
            && cityData.map((d) => (temp9.push({ value: d.cityCode, title: d.cityName })));
        setCity(temp9);
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
        setFormInput({ ['jbdTitle']: '', ['jbdDeptName']: '', ['jbdDesigName']: '', ['jbdLocName']: '', ['jbdPubFrmDate']: '', ['jbdPubToDate']: '' });
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
                            id="jbdTitle"
                            name="jbdTitle"
                            // placeholder="Type here..."
                            onInput={onInput}
                            value={(formInput.jbdTitle ?? '')}
                            // InputLabelProps={{ shrink: true }}
                            InputProps={{ disableUnderline: true }}
                            type="text" label={<Label labelId="BL00069" />}>
                        </TextField>
                    </Paper>
                </Grid>
                {/* <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <Autocomplete
                            className={classes.root}
                            id="jbdDesigName"
                            name="jbdDesigName"
                            onChange={(e,v) => onAutocomplete(v,'jbdDesigName')}
                            value={(formInput.jbdDesigName ?? '')}
                            options={desigdata}
                            InputProps={{ disableUnderline: true }}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => <TextField
                                {...params} InputProps={{...params.InputProps, disableUnderline: true }}
                                  label={<Label labelId="BL00072" />}  />}
                        />
                    </Paper>
                </Grid> */}
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <Autocomplete
                            className={classes.root}
                            id="jbdDeptName"
                            name="jbdDeptName"
                            onChange={(e, v) => onAutocomplete(v, 'jbdDeptName')}
                            value={(formInput.jbdDeptName ?? '')}
                            options={deptdata}
                            InputProps={{ disableUnderline: true }}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => <TextField
                                {...params} InputProps={{ ...params.InputProps, disableUnderline: true }}
                                label={<Label labelId="BL00073" />} />}
                        />
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <Autocomplete
                            className={classes.root}
                            id="jbdLocName"
                            name="jbdLocName"
                            onChange={(e, v) => onAutocomplete(v, 'jbdLocName')}
                            value={(formInput.jbdLocName ?? '')}
                            options={citydata}
                            InputProps={{ disableUnderline: true }}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => <TextField
                                {...params} InputProps={{ ...params.InputProps, disableUnderline: true }}
                                label={<Label labelId="BL00074" />} />}
                        />
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="jbdPubFrmDate"
                            name="jbdPubFrmDate"
                            value={(formInput.jbdPubFrmDate ?? '')}
                            onChange={onInput}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ disableUnderline: true }} type="date" label={<Label labelId="BL00127" />}>
                        </TextField>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                        <TextField className={classes.root}
                            id="jbdPubToDate"
                            name="jbdPubToDate"
                            value={(formInput.jbdPubToDate ?? '')}
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