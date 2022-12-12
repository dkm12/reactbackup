import './index.css'
import React from 'react';

function FormCOmp() {
  const [Name, setName] = React.useState("");
  const [hobey, setHobey] = React.useState("");
  const [Tnc, setTnc] = React.useState("")
  function getAllData(e) {
    console.log(Name,hobey,Tnc)
    e.preventDefault()
    
  }

  return (
    <div className="main-container">
      <h2>Form Handled in react</h2>
     <form onSubmit={getAllData}>
        <input type="text" placeholder="enter name" value={Name} onChange={(e) => setName(e.target.value)} />
        <select onChange={(e) => setTnc(e.target.value)}>
        <option >Please select option</option>
          <option >Hokey</option>
          <option>Cricket</option>
          <option>Football</option>
          <option>Badmiton</option>
        </select>
        <input type="checkbox" onChange={(e) => setHobey(e.target.checked)} /> 
        <button type="submit" >Submit</button>
        <button>clear</button>
        
 
        </form>
    
    </div>
      )

}
export default FormCOmp;