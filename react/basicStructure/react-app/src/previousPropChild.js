import './index.css'
import React, {useEffect,useRef} from 'react';


function PreviousPropsChid (props) {
  const lastCount=useRef();
useEffect(()=>{
  lastCount.current=props.childcount;


})

  
  return (
    <div className="main-container">
      <h1>Pre Prop Example</h1>
      <h2>Props count Current:{props.childcount}</h2>
      <h2>Props count Previous:{lastCount.current}</h2>
    </div>
  )

}
export default PreviousPropsChid;