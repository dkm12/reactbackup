import React from 'react'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import { useState } from 'react';

function RegistrationFormWithTrick() {

const [userregistration, setUserregistration]=useState({UserName:"",password:"",emailid:""})
const inputHandler=(e)=>{
const name=e.target.name
const value=e.target.value

setUserregistration({...userregistration, [name]:value})
// console.log(userregistration)
};
const formHandler=(e)=>{
e.preventDefault();
console.log(userregistration);
fetch("http://localhost:8000/userInfo" ,{
  method:'POST',
  headers:{
  'Accept':'application/json',
  'Content-Type':'application/json'
  },
body:JSON.stringify(userregistration)
}).then((result)=>{
  result.json().then((resp)=>{
    console.log(resp)
  })
})
setUserregistration({UserName:"",password:"",emailid:""})

}


  return (
    <>
      <Container maxWidth="sm">

        <Card>
          <CardContent  m={1}>
          <Box component="h2" m={1}>Registration Form</Box>
            <form onSubmit={formHandler}>
              <TextField label="user Name" fullWidth name="UserName" value={userregistration.UserName}  onChange={inputHandler} />
              <TextField type="password" label="password" fullWidth name="password" value={userregistration.password} onChange={inputHandler} />
              <TextField label="email Id" fullWidth name="emailid"  value={userregistration.emailid} onChange={inputHandler }/>
              <br />
              <br />
              <Button variant="contained" type="submit" color="primary"> Submit</Button>

            </form>
          </CardContent>

        </Card>

      </Container>
    </>
  )
}

export default RegistrationFormWithTrick;