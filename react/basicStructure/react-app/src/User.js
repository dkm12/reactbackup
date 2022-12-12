import React from 'react'
import './index.css';
import  {withRouter} from 'react-router-dom'
function User(props) {
  
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
//   const [result, setResult]=useState("")
// useEffect(()=>{

//   setResult (student.find( ({ id }) => id === parseInt(props.match.params.id )));},[student, props.match.params.id]
// )

// console.log(result)
  return (
    <div className="container">
   
      <table className="table">
        <thead><tr>
        <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>address</th>
        </tr>
        </thead>


        <tbody>
          {/* { console.log(props.match.params.id)} */}
          {
         
            student.map((item, i) => 
            parseInt(item.id)===parseInt(props.match.params.id)?
              <tr key={i}>
               
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>
              <table>
<tbody>
  {item.address.map((data,i)=>
   <tr key={i}>
     <td>{data.hn}</td>
     <td>{data.city}</td>
      <td>{data.country}</td>
   </tr>
   
  )
  }
</tbody>

              </table>



                </td>
       
              </tr>
              :null
            )}

        </tbody>
      </table>

    </div>
  );
}


export default withRouter(User);