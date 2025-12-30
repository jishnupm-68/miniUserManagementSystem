import { createSlice } from "@reduxjs/toolkit"



const dataSlice = createSlice({
    name:"data",
    initialState:null,
    reducers:{
        addData:(state, action)=>{
            return action.payload
        }
    }
})

export const {addData} = dataSlice.actions
export default dataSlice.reducer