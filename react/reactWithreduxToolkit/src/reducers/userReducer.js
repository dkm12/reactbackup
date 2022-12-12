import {createSlice } from '@reduxjs/toolkit';


const initialState={
      Name: "asdf",
    age: 32,
    status: "coder"
}



 const userReducer = createSlice({
  name: "person",
  initialState,
  reducers: {
    updateAge(state, action) {
      state.age = action.payload
},
updateName(state, action) {
      state.Name = action.payload
},

    updateStatus(state, action) {
      state.status = action.payload
  }
},


})

export default userReducer.reducer
export const {updateAge,updateName,updateStatus}=userReducer.actions
