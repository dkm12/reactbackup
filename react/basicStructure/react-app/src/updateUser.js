import './index.css'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

function UpdateUser() {
  let { id } = useParams();
  // console.log("id login", id);

  //  const [user, setUser]=useState("")
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [userid, setUserid] = useState(null)

  // const [userdata, setUserdata]=useState("");


  useEffect(() => {
    fetch("http://localhost:8000/user").then((result) => {
      result.json().then((res) => {
        let item = res[id]
        setName(item.name);
        setAge(item.age);
        setUserid(item.id)
      })
    })
  }, [id]);




  function updateUserd(e) {
    e.preventDefault();
    let data = { name, age, }
    if(name.length>3 || age.length>1){
      fetch(`http://localhost:8000/user/${userid}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((result) => {
        result.json().then((resp) => {
          alert("update sucessfully")
  
        })
      })
  

    }
else{
  alert("please provide min 3 charactor in name and 1 charactor in age")
}
   
  }



  return (
    <div className="main-container">
      <h1>Update user </h1>
      <form onSubmit={updateUserd}>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />

        <input type="text" name="age" value={age} onChange={(e) => setAge(parseInt(e.target.value))} placeholder="age" />
        <br />
        <br />

        <button>Update Detail</button>
      </form>
      <br />
      <br />
    </div>
  )

}
export default UpdateUser;