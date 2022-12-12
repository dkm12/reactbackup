import React, { useEffect,useState }from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import api from './api'




function AllemployeeDetails (){
  const [userinfo, setUserinfo]=useState([]);
  useEffect(()=>{
    api.get('user/user-info/user/allusers').then((response)=>{
      setUserinfo(response.data.data)
      // console.log(response.data.data);
    })
    .catch((error) => {
      console.log(error);
  }).then(() => {
      console.log('loading');
  });
      },[]);
  return(
  <>
  <Container maxWidth="lg">

  <Grid container spacing={3}>
  <Grid item  xs={12}>
 <Typography varient="h2">All user Data</Typography>
 <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">fullname</TableCell>
            <TableCell align="right">userrole</TableCell>
            <TableCell align="right">employId</TableCell>
            <TableCell align="right">emailId</TableCell>
            <TableCell align="right">loginId</TableCell>
            <TableCell align="right">mobNo</TableCell>
            <TableCell align="right">designation</TableCell>
            <TableCell align="right">department</TableCell>
            <TableCell align="right">location</TableCell>
            <TableCell align="right">empCategory</TableCell>
            <TableCell align="right">empCategoryCode</TableCell>
            <TableCell align="right">doj</TableCell>
            <TableCell align="right">rmCode</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userinfo.map((data,i) => (
            <TableRow key={i}>
           
              <TableCell align="right">{data.id}</TableCell>
              <TableCell align="right">{data.fullname}</TableCell>
              <TableCell align="right">{data.userrole}</TableCell>
              <TableCell align="right">{data.employId}</TableCell>
              <TableCell align="right">{data.emailId}</TableCell>
              <TableCell align="right">{data.loginId}</TableCell>
              <TableCell align="right">{data.mobNo}</TableCell>
              <TableCell align="right">{data.designation}</TableCell>
              <TableCell align="right">{data.department}</TableCell>
              <TableCell align="right">{data.location}</TableCell>
              <TableCell align="right"></TableCell>
             

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  </Grid>



  </Grid>


  </Container>
  </>
  )
}

export default AllemployeeDetails;