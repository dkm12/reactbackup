import './index.css'
import React, {useRef, useState} from 'react';
import ForwordRefChild from './forwordREfChild'

function ForwordRefParent () {
  const [data, setData]=useState("");
  let inputref = useRef(null);
  function handleInput(){

setData(inputref.current.value)
  }

  return (
    <div className="main-container">
     <h1>Forword Ref Example</h1>
      <ForwordRefChild ref={inputref} />
      <h2>{data}</h2>
      <button onClick={handleInput}>Input Handle </button>
  
    </div>
  )

}
export default ForwordRefParent;