import React from 'react'
import {CommnContext} from './CommnConext'

function ContextApiButton(){
  return(
<>
<CommnContext.Consumer> 
{
 
  ({btnColor})=>( 
    <>
    <button onClick={()=>btnColor('green')}>Change color</button>
    <button onClick={()=>btnColor('black')}>Change color</button>
    </>
    )
}

</CommnContext.Consumer>

</>

  )
}
export default  ContextApiButton ;