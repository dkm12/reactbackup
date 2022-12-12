import React from 'react'
import  './index.css';
function Reactmap(){

  const student =[
    {name:'deepak Misra', age:32, mobileNo:85412457},
    {name:'Vidit Mishra', age:2, mobileNo:2012487},
    {name:'Sapna Mishra', age:25, mobileNo:8287774111},
    {name:'Prakash Mishra', age:30, mobileNo:521014557}
  ]
  return(
    <div className="container">
<table border="1">
<tbody>
<tr>
 <th>Sno.</th>
<th>Name</th>
<th>Age</th>
<th>Mobile No</th>
</tr>
{
 
  student.map((item, i)=>
  item.mobileNo===8287774111?
  <tr key={i}>
 <td>{i+1}</td>
<td>{item.name}</td>
<td>{item.age}</td>
<td>{item.mobileNo}</td>
</tr>
:null
)
}


</tbody>
</table>
    </div>
  );
}


export default Reactmap;