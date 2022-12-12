import React from 'react'
// import { useEffect, useState } from 'react';
import {Route, Redirect} from 'react-router-dom';

const AuthRoute =({children, ...rest})=>{
let isAuth=false; 
  if(localStorage.getItem('userinfo')){
    
    isAuth=true;
  }else{
    isAuth=false;
  }
  
return( <Route {...rest} render={()=>isAuth?(children):(<Redirect to={"/login"}/>)} />);

}

export default AuthRoute;