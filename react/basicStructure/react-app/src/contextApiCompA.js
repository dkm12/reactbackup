import React from 'react'
import {CommnContext} from './CommnConext'

function ContextApiCompA(){
  return(
<>
<CommnContext.Consumer> 
{
 
  ({color})=>(  <h1 style={{backgroundColor:color}}>I am deepak Mishra</h1>

  )
}

</CommnContext.Consumer>

</>

  )
}
export default  ContextApiCompA ;