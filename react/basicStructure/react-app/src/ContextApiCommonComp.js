

import React, { useState } from 'react'
import {CommnContext} from './CommnConext'
import ContextApiCompA from './contextApiCompA'
import ContextApiButton from './contextAPIButtonComp'
import ContextApiCompB from './contextApiCompB'

function ContextApiCommonComp(){

  const updateColor=(clr)=>setColors({...colors, color:clr})
const [colors, setColors]=useState({color:"#ff0000", btnColor:updateColor})


  return(
<>
<CommnContext.Provider value={colors} >
<ContextApiCompA />
<ContextApiButton />
<ContextApiCompB />
</CommnContext.Provider>
</>

  )
}


export default ContextApiCommonComp;