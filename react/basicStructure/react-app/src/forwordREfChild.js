import './index.css'
import React,{forwardRef} from 'react';

function ForwordRefChild (props, ref) {
  
  return (
    <div className="main-container">
      
      <input type="text" ref={ref} />
  
    </div>
  )

}

export default forwardRef( ForwordRefChild);