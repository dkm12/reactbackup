import _ from '@lodash';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

function SearchFilter(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const routeParams = useParams();
    const [message, setmessage] = useState('');
    const [select, setselect] = useState('');

    useEffect(() => {
    }, [dispatch]);

    async function onInput(val) {
        setmessage(val)
    }

    async function onSelect(val) {
        setselect(val.target.value)
    }    
    async function onSearch() {
        props.change(message,select)
        // if(message || select) props.change(message,select)
    }
    return (
        <Grid container spacing={16}>
            <Grid xs={12} sm={10}>
                <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                    <Input
                        placeholder="Type Message"
                        className="flex flex-1"
                        disableUnderline
                        fullWidth
                        value={message}
                        // onInput={props.change} 
                        onInput={event => onInput(event.target.value)}
                    // helperText={error ? "Bewteen 2 to 25 characters are allowed" : ""}
                    />
                    <Icon color="primary" className="pointer"
                     onClick={event => onSearch()}
                     >search</Icon>
                </Paper>
            </Grid>
            {/* filterArr */}
            <Grid xs={12} sm={2}>
                <InputLabel id="label">Filter Option</InputLabel>
                <Select labelId="label" id="select" value={select}
                    onChange={event => onSelect(event)}
                >
                    {(props.filterArr) &&
                        props.filterArr.map((n, ind) => {
                            return (
                                <MenuItem value={n.value}>{n.name}</MenuItem>
                            )
                        })}
                </Select>
            </Grid>
        </Grid>
    );
}

export default SearchFilter;