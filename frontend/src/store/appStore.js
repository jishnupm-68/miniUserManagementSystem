import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slice/userSlice"
import dataReducer from "./slice/dataSlice"
const appStore =  configureStore({
  reducer: {
    user:userReducer,
    data:dataReducer
  }
})

export default appStore