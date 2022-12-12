import './index.css'
import React, { useState } from 'react';

function AddUser () {
  const[name,setName]=useState("");

  const[age,setAge]=useState("")
  function saveUser(e){
console.log({name,age})
let data={name,age}

e.preventDefault();
fetch("http://localhost:8000/user" ,{
  method:'POST',
  headers:{
  'Accept':'application/json',
  'Content-Type':'application/json'
  },
  body:JSON.stringify(data)
}).then((result)=>{
  result.json().then((resp)=>{
    console.log(resp)
  })
})
setAge("");

setName("");
  }
  
  return (
    <div className="main-container">
      <h1>Add user </h1>
      <form onSubmit={saveUser}>
      <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="name" />
      
      <input type="number" name="age" value={age} onChange={(e)=>setAge(parseInt(e.target.value))} placeholder="age" />
      <br/>
      <br/>

  <button type="Submit" >Submit</button>
  </form>
  <br/>
      <br/>
    </div>
  )

}
export default AddUser;