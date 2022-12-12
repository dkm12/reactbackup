import './index.css'
import React, { useEffect, useState } from 'react';

import {Link} from 'react-router-dom';

function FirstApiUse() {
  const [user, setUser] = useState([])
  useEffect(() => {
    getalldata()

  }, [])
function getalldata(){
  fetch("http://localhost:8000/user").then((result) => {
    result.json().then((res) => {
      setUser(res);

    })
  })
}

function deleteUser(id){
  fetch("http://localhost:8000/user/"+ id, {
    method:'DELETE'
  }).then((result)=>{
    result.json().then((resp)=>{
      getalldata();
    })
  })
 
}

  return (
    <div className="main-container">
      <h1>Basic Example of api Intrigation</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
             <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

          {
            user.map((item, i) =>
            item.id>3?
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                {/* <td>

                  <table className="table">
                    <tbody>
                      {
                        item.address.map((data, i) =>
                          <tr key={i}>
                            <td>{data.hn}</td>
                            <td>{data.city}</td>
                            <td>{data.country}</td>


                          </tr>
                        )
                      }
                    </tbody>

                  </table>


                </td> */}
                <td><button onClick={()=>deleteUser(item.id)}>Delete User</button> 
                <button><Link to={"/UpdateUser/"+i}>edit User {i}</Link></button>
                </td>

              </tr>
              :null
            )
          }
        </tbody>

      </table>
      <button><Link to="/addUser">Add user</Link></button>
    </div>
  )



}
export default FirstApiUse;