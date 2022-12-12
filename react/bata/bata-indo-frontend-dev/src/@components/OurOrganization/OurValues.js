import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexGrow: 1,
        width: '100%',
        '& h6 span': {
            borderBottom: '2px solid #e2001a'
        }
    }
});

function OurValues() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item md={6} sm={12} className="p-24">
                    <Typography variant="h6" gutterBottom><span>SERVE WITH PASSION</span></Typography>
                    <Typography variant="subtitle1" gutterBottom>For Bata, the shoe industry has been a lifelong family passion, requiring hard work by a close-knit, determined team, listening to our consumers' needs and understanding how best to satisfy their requests. It is this desire to continue to offer the best products and services that help keep us at the forefront of our industry.</Typography>
                </Grid>
                <Grid item md={6} sm={12} className="p-24">
                    <img src="/app/assets/images/banner/ov1.jpg" alt="SERVE WITH PASSION" />
                </Grid>
                <Grid item xs={12}><Divider variant="middle" className="my-16" /></Grid>
                <Grid item md={6} sm={12} className="p-24">
                    <img src="/app/assets/images/banner/ov2.jpg" alt="BE BOLD" />
                </Grid>
                <Grid item item md={6} sm={12} className="p-24">
                <Typography variant="h6" gutterBottom><span>BE BOLD</span></Typography>
                    <Typography variant="subtitle1" gutterBottom>Courageous Innovation has always been the cornerstone of our company, from the canvas shoes Tomas Bata proposed when everyone else in Europe was selling leather or wood, to the pioneering expansion to new continents starting in the 1930s.</Typography>
                </Grid>
                <Grid item xs={12}><Divider variant="middle" className="my-16" /></Grid>
                <Grid item md={6} sm={12} className="p-24">
                <Typography variant="h6" gutterBottom><span>COUNT ON ME</span></Typography>
                    <Typography variant="subtitle1" gutterBottom>Our founder, Tomas Bata, understood that in order to do a job well, we must lead by example. We have never forgotten our founder's words, and today we still hold the same beliefs to be true. The decisions we take are made with our long-term future in mind, not for immediate gain.</Typography>
                </Grid>
                <Grid item md={6} sm={12} className="p-24">
                    <img src="/app/assets/images/banner/ov1.jpg" alt="COUNT ON ME" />
                </Grid>
                <Grid item xs={12}><Divider variant="middle" className="my-16" /></Grid>
                <Grid item md={6} sm={12} className="p-24">
                    <img src="/app/assets/images/banner/ov2.jpg" alt="EXCEED CUSTOMER EXPECTATIONS" />
                </Grid>
                <Grid item md={6} sm={12} className="p-24">
                <Typography variant="h6" gutterBottom><span>EXCEED CUSTOMER EXPECTATIONS</span></Typography>
                    <Typography variant="subtitle1" gutterBottom>Bata believes in pushing boundaries, in going the extra mile. We take pride in recognizing and rewarding excellence, promoting a "can do" culture throughout our organisation.  This is true of our products, our services and our personnel. We know that different customers have different needs, and it is our aim not only to satisfy but to exceed them, building intrinsic value into every product we make.</Typography>
                </Grid>
                <Grid item xs={12}><Divider variant="middle" className="my-16" /></Grid>
                <Grid item md={6} sm={12} className="p-24">
                <Typography variant="h6" gutterBottom><span>IMPROVING LIVES</span></Typography>
                    <Typography variant="subtitle1" gutterBottom>At Bata we believe that we are part of each community in which we operate. This means supporting our consumers, teams and the community itself, as well as providing opportunities for personal and professional growth. As a truly global Group, we work across diverse cultures, and believe that each of these should be respected.</Typography>
                </Grid>
                <Grid item md={6} sm={12} className="p-24">
                    <img src="/app/assets/images/banner/ov1.jpg" alt="IMPROVING LIVES" />
                </Grid>
            </Grid>
        </div>
    )
}

export default OurValues;