import './index.css'
import UseeffecChildComp from './useEffectChildComp';
import React, { useState} from 'react';

function UseeffectWithStatePropsComp() {
const [count, setCount]=useState(100)
const [data, setdata]=useState(10)





  return (
    <div className="main-container" >

    
      <UseeffecChildComp counter={count}  data={data}/>
      <button onClick={()=>setCount(count+1)}>Update Counter</button>
      <button onClick={()=>setdata(data+1)}>Update data</button>
    </div>
  )

}
export default UseeffectWithStatePropsComp;