import React from 'react'
import './index.css'
function ChildToPChild(props){
  const student={name:'deepak Mishra', age:32, fathersName:'Kamla Kant Mishra'}
  return(
    <div className="main-container">
<h1>Child component</h1>
<button onClick={()=>props.studentDetail(student)}>sudent detail</button>

    </div>
  )
}
export default ChildToPChild;