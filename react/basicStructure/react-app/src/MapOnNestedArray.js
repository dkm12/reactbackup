import React from 'react'
import './index.css';
function ReacMapOnNestedArray() {

  const student = [
    {
      name: 'deepak Misra', age: 32, address: [
        { hn: 32, city: 'delhi', country: 'india' },
        { hn: 33, city: 'Mumbai', country: 'india' },
        { hn: 39, city: 'Kokatta', country: 'india' },
        { hn: 40, city: 'Channai', country: 'india' }

      ]
    },
    {
      name: 'Vidit Mishra', age: 2, address: [
        { hn: 32, city: 'delhi', country: 'india' },
        { hn: 33, city: 'Mumbai', country: 'india' },
        { hn: 39, city: 'Kokatta', country: 'india' },
        { hn: 40, city: 'Channai', country: 'india' }

      ]
    },
    {
      name: 'Sapna Mishra', age: 25, address: [
        { hn: 32, city: 'delhi', country: 'india' },
        { hn: 33, city: 'Mumbai', country: 'india' },
        { hn: 39, city: 'Kokatta', country: 'india' },
        { hn: 40, city: 'Channai', country: 'india' }

      ]
    },
    {
      name: 'Prakash Mishra', age: 30, address: [
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
          <th>Name</th>
          <th>Age</th>
          <th>Addres</th>
        </tr>
        </thead>


        <tbody>
          {
            student.map((item, i) =>
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>
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
    
  </td>
              </tr>
            )
          }

        </tbody>
      </table>

    </div>
  );
}


export default ReacMapOnNestedArray;