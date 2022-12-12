import './index.css'
import React from 'react';

function HideAndShow () {
  const [Status, setStatus] = React.useState(true);

  return (
    <div className="main-container">
        <button onClick={()=>setStatus(true)}>Show</button>
      <button onClick={()=>setStatus(false)}>Hide</button>
      <button onClick={()=>setStatus(!Status)}>Toggle</button>
      {Status ?<h2>Hide ,show and Toggle </h2> :null}
    
    </div>
  )

}
export default  HideAndShow;