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
    const [formInput, setFormInput] = useReducer((state, newState) => ({ ...state, ...newState }),{});

    async function getDropdownData(){
        let catData = await masterApi.getAllActiveTrainingCategory();
        let catArray = [];
        _.isArray(catData)
            && catData.map((d) => (catArray.push({ value: d.trngCatCode, title: d.trngCatName })));


        let subCatArray = [];
        let subCatData = await masterApi.getAllActiveTrainingSubCategory();
        _.isArray(subCatData)
            && subCatData.map((d) => (subCatArray.push({ value: d.trngSubcatCode, title: d.trngSubcatName })));

        //console.log("cityDropDown", data);
        //setCities(cityArray);
        setMasterData(
            {
                categories: catArray,
                subCategories: subCatArray
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

    function onClear(val) {
        var newFormInput = {};
        Object.keys(formInput).forEach(function(key){
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
                        id="trngName"
                        name="trngName"
                        onInput={onInput}
                        InputProps={{ disableUnderline: true }}
                        value={(formInput.trngName ?? '')}
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
                        value={(formInput.learningPlatform ?? '')}
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
                        value={(formInput.trngCategoryCode ?? '')} 
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
                        value={(formInput.trngSubCategoryCode ?? '')}
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
            </Grid>
            <Grid xs={12} sm={2}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root} 
                        id="trngPublishTillDateFrom"
                        name="trngPublishTillDateFrom"
                        onChange={onInput}
                        value={(formInput.trngPublishTillDateFrom ?? '')}
                        InputProps={{ disableUnderline: true }} type="date">
                    </TextField>
                    </Paper>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <TextField className={classes.root} 
                        id="trngPublishTillDateTo"
                        name="trngPublishTillDateTo"
                        onChange={onInput}
                        value={(formInput.trngPublishTillDateTo ?? '')}
                        InputProps={{ disableUnderline: true }} type="date">
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
    );
}

export default SearchFilter;