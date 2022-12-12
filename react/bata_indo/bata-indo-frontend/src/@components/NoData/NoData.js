import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
});

function NoData() {
    const classes = useStyles();
    return (
        <div className={classes.root} align="center">
            <SearchIcon className="mt-48" color="primary" style={{ fontSize: 72 }} />
            <Typography variant="h6" gutterBottom>No Results Found</Typography>
            <Typography variant="subtitle1" gutterBottom>We cannot find any item matching your search.</Typography>
        </div>
    )
}

export default NoData;