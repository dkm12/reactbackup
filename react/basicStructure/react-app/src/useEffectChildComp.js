import './index.css'
import React,{useEffect} from 'react';
function UseeffecChildComp (props) {
  useEffect(()=>{

    // console.log("useEffect called")
  },[props.data, props.counter])
  useEffect(()=>{

    // console.log("useEffect conter")
  },[props.counter])

  return (
  <div className="main-container">
    <h1>counter count: {props.counter}</h1>
    
    <h2>data Cont: {props.data}</h2>
      
    </div>
  )

}
export default UseeffecChildComp;