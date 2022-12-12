import React,{ useContext} from 'react'
import {CommnContext} from './CommnConext'


function ContextApiCompB(){
  const colr = useContext(CommnContext);
  console.log(colr.color)
  return(
<>
<h1 style={{backgroundColor:colr.color}}>My name Deepak</h1>



</>

  )
}
export default  ContextApiCompB ;