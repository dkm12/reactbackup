import React from 'react'
// import { useEffect, useState } from 'react';
import {Route, Redirect} from 'react-router-dom';

const UnAuthRoute =({children, ...rest})=>{
let isAuth=true; 
  if(localStorage.getItem('userinfo')){
    
    isAuth=false;
  }else{
    isAuth=true;
  }
  




return( <Route {...rest} render={()=>isAuth?(children):(<Redirect to={"/profilepage"}/>)} />);

}

export default UnAuthRoute;