import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState: {
        userData: {},
        personalData: {}
    },
    reducers: {
        setuserDetails: (state,action) => {
            state.userData = action.payload
        },
        setPersonalDetails: (state,action) => {
            state.personalData = action.payload
        }
    }
})
export const {setuserDetails,setPersonalDetails} = userSlice.actions
export default userSlice.reducer