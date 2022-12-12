import './index.css'
import React, {useRef, useState} from 'react';

function UseRefComp () {
  const [inputval, setInputval]=useState("")
  let inputRef=useRef(null)
  
  function handleInput(){
    // inputRef.current.value="1000";
    // console.log("function call")
    setInputval(inputRef.current.value)
  }

  return (
    <div className="main-container">
      <h1>Ref Hook in function Component</h1>
      <h2>Input value:{inputval}</h2>
      <input type="text" ref={inputRef} />
      <button onClick={handleInput}>Input Handle </button>
  
    </div>
  )

}
export default UseRefComp;