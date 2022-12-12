import './index.css'
import React from 'react';

function GetInputBoxVale () {
  const [data, setData] = React.useState(null);
  const [Print, setPrint] = React.useState(false);
  
  function Getdata(val){
    let fvalue;
    fvalue=val.target.value;
console.log(fvalue)

    setData(fvalue);
  }
  return (
    <div className="main-container">
      <h1>Get Input Box Value on change</h1>
      <input type="text" onChange={Getdata} />
      <button onClick={()=>setPrint(true)}>Print</button>
     ` {Print? <h2>{data}</h2>:null}`
      {/* <h2>{data}</h2> */}
    </div>
  )

}
export default GetInputBoxVale;