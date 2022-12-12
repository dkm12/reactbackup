import './index.css'
import React, { useState } from 'react';
import PreviousPropsChid from './previousPropChild'

function PreviousProps () {
   const[count, setCount]=useState(1);
   const[prevous, setPreious]=useState(0);
   const[childcount, setChildcount]=useState(0)
  function counter(){
setCount((pre)=>{
  if(pre>2){
    alert("Maximus limit excced")
  }
  console.log(pre);
  setPreious(pre)

  return count+1
})

  }

  return (
    <div className="main-container">
      <h1> PreState Example</h1>
      <h2>current Counter{count}</h2>
      <h2>Previous Counter{prevous}</h2>
      <button onClick={counter}>Counter</button>
      <PreviousPropsChid childcount={childcount} />
      <button onClick={()=>setChildcount(childcount+1)}>Counter</button>
  
    </div>
  )

}
export default PreviousProps;