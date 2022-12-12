import React from 'react'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
// import classes from '*.module.css';

const useStyles = makeStyles((theme) => ({
    root: {
        textTransform: 'uppercase',
        minHeight: '40px',
        position: 'relative',
        borderBottom: '2px solid #e2001a',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        padding: '5px 16px'
    }
}))
function Index(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="subtitle1">{props.children}</Typography>
        </div>
    )
}

export default Index
