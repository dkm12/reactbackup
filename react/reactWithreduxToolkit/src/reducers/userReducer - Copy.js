import {createSlice } from '@reduxjs/toolkit';
const intialState={
  Name: "ramesh",
  age: 32,
  status: "coder"
}



 const userReducer = createSlice({
  name: "person",
  intialState,
  reducers: {
    updateAge(state, action) {
      state.age = action.payload
},
updateName(state, action) {
      state.name = action.payload
},

    updateStatus(state, action) {
      state.status = action.payload
  },
},



})

export default userReducer.reducer
export const {updateAge,updateName,updateStatus}=userReducer.actions;



// export default createReducer(intialState,(builder)=>{
// builder.addCase('UPDATE_AGE',(state, action)=>{
// state.age=action.payload
// })
// builder.addCase('UPDATE_NAME',(state, action)=>{
//   state.name=action.payload
//   })


//     builder.addCase('UPDATE_STATUS',(state, action)=>{
//       state.status=action.payload
//       })

// })