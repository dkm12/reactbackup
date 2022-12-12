import React from 'react'
import './index.css';
import ChildToPChild from './childToPChild'
function ChildToParent(){
  const [data,setData]=React.useState("")
  function studenDetail(student){
 setData(student);
  }
  return(
    <div className="main-container">
<h1>Parent component</h1>
<p>Student Detail: {data.name} { data.age}{data.fathersName}</p>
<ChildToPChild  studentDetail={studenDetail} />

    </div>
  )
}
export default ChildToParent;