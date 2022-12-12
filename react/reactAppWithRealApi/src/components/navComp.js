import React from 'react'
// import { useState } from 'react'
// import { useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'


function  NavComp(){
const history=useHistory();
const logout=()=>{
  localStorage.clear();
  history.push('/login');
}

// const [lstatus, setlstatus]=useState(false) ;
// const getlocalstoreval=()=>{
//   if (localStorage.getItem('userinfo')){
//     setlstatus(true);
//     console.log('stirefunction',lstatus)
//   }
// }


// useEffect(()=>{
//   getlocalstoreval();
//   console.log("console")
// },[lstatus])
  return(
  <>
   
        {
          localStorage.getItem('userinfo')?
          <>
        <div className="navigation">
        <ul>
        <li><Link to="/profilepage">  Profile</Link></li>
        <li><Link to="/tourAndTravelPage">Tour and Travel</Link></li>
        <li><Link to="/AllemployeeDetails">All Employeee Detail</Link></li>
        <li><Link to="/AddConvence">Add Convence</Link></li>
        <li><button onClick={logout}>logout</button></li>
        </ul>
        </div>  
         </>:null
}
  </>

  )
}

export default NavComp;