import React from 'react'
import './index.css';
import {Link} from 'react-router-dom'
function UserList() {
  

  const student = [
    {
     id:23015, name: 'deepak Misra', age: 32, address: [
        { hn: 32, city: 'delhi', country: 'india' },
        { hn: 33, city: 'Mumbai', country: 'india' },
        { hn: 39, city: 'Kokatta', country: 'india' },
        { hn: 40, city: 'Channai', country: 'india' }

      ]
    },
    {
      id:13, name: 'Vidit Mishra', age: 2, address: [
        { hn: 32, city: 'delhi', country: 'india' },
        { hn: 33, city: 'Mumbai', country: 'india' },
        { hn: 39, city: 'Kokatta', country: 'india' },
        { hn: 40, city: 'Channai', country: 'india' }

      ]
    },
    {
      id:14, name: 'Sapna Mishra', age: 25, address: [
        { hn: 32, city: 'delhi', country: 'india' },
        { hn: 33, city: 'Mumbai', country: 'india' },
        { hn: 39, city: 'Kokatta', country: 'india' },
        { hn: 40, city: 'Channai', country: 'india' }

      ]
    },
    {
      id:15, name: 'Prakash Mishra', age: 30, address: [
        { hn: 32, city: 'delhi', country: 'india' },
        { hn: 33, city: 'Mumbai', country: 'india' },
        { hn: 39, city: 'Kokatta', country: 'india' },
        { hn: 40, city: 'Channai', country: 'india' }

      ]
    }
  ]
  return (
    <div className="container">
      <table className="table">
        <thead><tr>
          <th>ID</th>
          <th>Age</th>
          <th>Action</th>
        </tr>
        </thead>


        <tbody>
          {
            student.map((item, i) =>
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td><Link to={"/User/"+ item.id}>View Detail</Link></td>
       
              </tr>
            )
          }

        </tbody>
      </table>

    </div>
  );
}


export default UserList;