import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from '../pages/temp/store'
import userReducer from '../pages/KYC/store'
export const store = configureStore({
  reducer: {
    jobs: userReducer,
    // aadharuser: userReducer
  },
})