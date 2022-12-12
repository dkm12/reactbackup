import './index.css'
import React from 'react';

function StateWithFunctionComponent() {
  const [Data, setData] = React.useState("Deepak Mishra")
  return (
    <div className="main-container">
      <h1>Functional Component</h1>
      <h2>{Data}</h2>
      <button onClick={()=>setData("ravi")}>UpdateName</button>
    </div>
  )

}
export default StateWithFunctionComponent;