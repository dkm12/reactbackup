import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {updateAge,updateName,updateStatus} from '../reducers/userReducer'


function Profile() {
// const {Name,age,status} =useSelector((state)=>state)
 const pdetail=useSelector((state)=>{
return state

 }
 )
 


const dispatch = useDispatch();


const changeAge = (age)=>{
  dispatch(updateAge(age))
  }
  const changeName = (name)=>{
    dispatch(updateName(name))
}
  
    const changeStaus = (status)=>{
      dispatch(updateStatus(status))
   }



// const updateAge =(age)=>{
// dispatch({type:'UPDATE_AGE',payload:age})
// }
// const updatename =(name)=>{
//   dispatch({type:'UPDATE_NAME',payload:name})
//   }

//   const changeStaus =(status)=>{
//     dispatch(updateStatus(status))
//     }



  return (
    <>
      {/* <h1>My name is {pdetail.Name} age{pdetail.age} status {pdetail.status}</h1> */}
      {/* <h1>My name is {Name} age{age} status {status}</h1> */}
      <button onClick={()=>changeAge(40)}>Upadate age</button>
      <button onClick={()=>changeName("deepak Mishra")}>Upadate Name</button>
      <button onClick={()=>changeStaus("Single")}>Upadate Name</button>


    </>
  )
}


export default  Profile;