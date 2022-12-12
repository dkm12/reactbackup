import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {api1} from './api'



function AddConvence() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const onSubmit = (data) => {
    console.log('use form deta',data);
api1.post('local-convy-service/local-convy/save', data).then((response)=>{
console.log('response',response)
})
  }

  return (<>

    <Container maxWidth="lg">
      <Card>
        <CardContent m={1} >
          <Typography varient="h2">Add Convence Detail</Typography>
          <form onSubmit={handleSubmit(onSubmit)} >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel >from Location</InputLabel>
                  <Select {...register('fromLoc')}>
                  <MenuItem value="agra" >Agra</MenuItem>
                    <MenuItem  value="Delhi" >Delhi</MenuItem>
                    <MenuItem   value="Mumbai">Mumbai</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth >
                  <InputLabel >To Location</InputLabel>
                  <Select  {...register('toLoc')}>
                    <MenuItem value="agra" >Agra</MenuItem>
                    <MenuItem  value="Delhi" >Delhi</MenuItem>
                    <MenuItem   value="Mumbai">Mumbai</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth >
                  <Select  {...register('modeOfTravel')}>
                    <MenuItem  value="Bus">Bus </MenuItem>
                    <MenuItem   value="Two whealer">Two Whealer</MenuItem>
                    <MenuItem  value="Car">Car</MenuItem>
                  </Select>
                </FormControl>
              </Grid><Grid item xs={6}>
                <TextField label="travel Purpose" fullWidth  {...register('trvlPurpose')}/>
              </Grid>
              <Grid item xs={6}>
                <TextField label="Mode of travel" fullWidth {...register('modeOfTravel')} />
              </Grid>
           
            </Grid>
            <Button variant="contained" type="submit" color="primary"> Add Employee</Button>
          </form>
        </CardContent>

      </Card>
    </Container>


  </>)
}

export default AddConvence;