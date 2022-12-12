import './index.css'
import React from 'react';

function MemohookComp() {
  const [count, setCount]=React.useState(0);
  const [data, setData]=React.useState(100)
const countmulty=React.useMemo(function countMultiply(){
  // console.log("function render testing")
  return count*5
},[count])
  
  return (
    <div className="main-container">
      <h2>Count:{count}</h2>
      <h2>Data:{data}</h2>
      <h2>Multyply:{countmulty}</h2>
      <button onClick={()=>setCount(count+1)}>Count</button>
      <button onClick={()=>setData(data+1)}>Data</button>
     
    </div>
  )

}
export default MemohookComp;