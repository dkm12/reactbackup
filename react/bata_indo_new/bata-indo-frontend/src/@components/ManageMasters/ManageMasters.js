import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Label } from '@common/utils/label';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        width: '100%',
        '& ul': {
            display: 'flex',
            flexWrap: 'wrap',
            margin: '4px -.65%',
            [theme.breakpoints.down('md')]: {
                margin: '4px -1%',
            },
            [theme.breakpoints.down('xs')]: {
                margin: '4px -1%',
            }
        },
        '& a': {
            flex: '0 0 32%',
            margin: '4px .65%',
            color: '#e2001a',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            background: '#f6f7f9',
            transition: 'all .15s ease-in',
            [theme.breakpoints.down('md')]: {
                flex: '0 0 48%',
                margin: '4px 1%',
            },
            [theme.breakpoints.down('xs')]: {
                flex: '0 0 98%',
                margin: '4px 1%',
            }
        },
        '& span': {
            padding: '2%'
        },
        '& a:hover': {
            border: '1px solid rgba(0, 0, 0, 0.72)',
            textDecoration: 'none'
        }
    }
}));

function ManageMasters() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item md={12} className="p-24">
                    <List>
                        <Link to="/app/master/bill-type/listing">
                            <ListItemText primary={<Label labelId="BL00318" />} />
                        </Link>
                        <Link to="/app/master/city/listing">
                            <ListItemText primary={<Label labelId="BL00137" />} />
                        </Link>
                        <Link to="/app/master/department/listing">
                            <ListItemText primary={<Label labelId="BL00167" />} />
                        </Link>
                        <Link to="/app/master/designation/listing">
                            <ListItemText primary={<Label labelId="BL00166" />} />
                        </Link>
                        <Link to="/app/master/division/listing">
                            <ListItemText primary={<Label labelId="BL00327" />} />
                        </Link>
                        <Link to="/app/master/employee-category/listing">
                            <ListItemText primary={<Label labelId="BL00265" />} />
                        </Link>
                        <Link to="/app/master/employee-type/listing">
                            <ListItemText primary={<Label labelId="BL00331" />} />
                        </Link>
                        <Link to="/app/master/gender/listing">
                            <ListItemText primary={<Label labelId="BL00334" />} />
                        </Link>
                        <Link to="/app/master/holiday/listing">
                            <ListItemText primary={<Label labelId="BL00427" />} />
                        </Link>
                        <Link to="/app/master/leave-category/listing">
                            <ListItemText primary={<Label labelId="BL00170" />} />
                        </Link>
                        <Link to="/app/master/local-travel-mode-eligibility/listing">
                            <ListItemText primary={<Label labelId="BL00344" />} />
                        </Link>
                        <Link to="/app/master/marital-status/listing">
                            <ListItemText primary={<Label labelId="BL00282" />} />
                        </Link>
                        <Link to="/app/master/organizational-values/listing">
                            <ListItemText primary={<Label labelId="BL00229" />} />
                        </Link>
                        <Link to="/app/master/salutation/listing">
                            <ListItemText primary={<Label labelId="BL00276" />} />
                        </Link>
                        <Link to="/app/master/state/listing">
                            <ListItemText primary={<Label labelId="BL00271" />} />
                        </Link>
                        <Link to="/app/master/subDepartment/listing">
                            <ListItemText primary={<Label labelId="BL00269" />} />
                        </Link>
                        <Link to="/app/master/travel-mode-eligibility/listing">
                            <ListItemText primary={<Label labelId="BL00352" />} />
                        </Link>
                        <Link to="/app/master/training-category/listing">
                            <ListItemText primary={<Label labelId="BL00365" />} />
                        </Link>
                        <Link to="/app/master/training-sub-category/listing">
                            <ListItemText primary={<Label labelId="BL00368" />} />
                        </Link>
                        <Link to="/app/master/vertical/listing">
                            <ListItemText primary={<Label labelId="BL00359" />} />
                        </Link>
                        <Link to="/app/master/zone/listing">
                            <ListItemText primary={<Label labelId="BL00361" />} />
                        </Link>  

                        {/* <ListItem button component="a" href="/app/master/bill-type/listing">
                            <ListItemText primary={<Label labelId="BL00318" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/city/listing">
                            <ListItemText primary={<Label labelId="BL00137" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/city-type-mapping/listing">
                            <ListItemText primary="City Type Mapping" />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/department/listing">
                            <ListItemText primary={<Label labelId="BL00167" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/designation/listing">
                            <ListItemText primary={<Label labelId="BL00166" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/division/listing">
                            <ListItemText primary={<Label labelId="BL00327" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/employee-category/listing">
                            <ListItemText primary={<Label labelId="BL00265" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/employee-type/listing">
                            <ListItemText primary={<Label labelId="BL00331" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/gender/listing">
                            <ListItemText primary={<Label labelId="BL00334" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/grade/listing">
                            <ListItemText primary="Grade" />
                        </ListItem> 
                        <ListItem button component="a" href="/app/master/hod/listing">
                            <ListItemText primary="HOD" />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/holiday/listing">
                            <ListItemText primary={<Label labelId="BL00427" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/leave-category/listing">
                            <ListItemText primary={<Label labelId="BL00170" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/local-travel-mode-eligibility/listing">
                            <ListItemText primary={<Label labelId="BL00344" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/location/listing">
                            <ListItemText primary="Location" />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/marital-status/listing">
                            <ListItemText primary={<Label labelId="BL00282" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/travel-mode-eligibility/listing">
                            <ListItemText primary={<Label labelId="BL00352" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/salutation/listing">
                            <ListItemText primary={<Label labelId="BL00276" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/state/listing">
                            <ListItemText primary={<Label labelId="BL00271" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/subDepartment/listing">
                            <ListItemText primary={<Label labelId="BL00269" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/vertical/listing">
                            <ListItemText primary={<Label labelId="BL00359" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/zone/listing">
                            <ListItemText primary={<Label labelId="BL00361" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/organizational-values/listing">
                            <ListItemText primary={<Label labelId="BL00229" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/training-category/listing">
                            <ListItemText primary={<Label labelId="BL00365" />} />
                        </ListItem>
                        <ListItem button component="a" href="/app/master/training-sub-category/listing">
                            <ListItemText primary={<Label labelId="BL00368" />} />
                        </ListItem> */}
                    </List>
                </Grid>
            </Grid>
        </div>
    )
}

export default ManageMasters;