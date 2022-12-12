import './index.css'
import React from 'react';

function FormValidation() {
  const [Name, setName] = React.useState("");
  const [password, setPassord] = React.useState("");
  // const [btn, setBtn] = React.useState(false);
  const [usererr, setUsererr] = React.useState(false);
  const [passerr, Setpasserr] = React.useState(false);


 
  function Formhandle(e) {
  e.preventDefault()
  console.log(Name,password)
  if(Name.length<3 || password.length<3 ){

    alert("type correct values")

  }
  else{ alert("Submit Form Sucessfuly")}

  }

function userHandler(e){
let data = e.target.value;
if(data.length<3){
  setUsererr(true)
}
else{
  setUsererr(false)
}
setName(data)
}

function passHandler(e){
  let data = e.target.value;
  if(data.length<3){
    Setpasserr(true)
  }
  else{
    Setpasserr(false)
  }

  setPassord(data)
  } 

  return (
    <div className="main-container">
      <h2>Custom form Validation in react</h2>
     <form onSubmit={Formhandle}>
        <input type="text" placeholder="enter name"  onChange={userHandler} />{usererr?<span>Please enter minimum 3 letter</span>:""}<br/><br/>
        
        <input type="text" placeholder="enter Password"  onChange={passHandler} /> {passerr?<span>Please enter minimum 3 letter</span>:""}
       {/* <button type="submit" disabled={btn} onChange={()=>(Name.length<3 || password.length<3)?setBtn(true):setBtn(false)}> Submit</button> */}
 <button >Submit</button>
        </form>
    
    </div>
      )

}
export default FormValidation;