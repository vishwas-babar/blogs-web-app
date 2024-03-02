import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: ( state, action ) => {
            state.status = true,
            state.userData = action.payload
        },
        logoutUser: (state, action) => {
            state.status = false,
            state.userData = null
        },
    }
});


export const { loginUser, logoutUser } = userSlice.actions; // inside the reducer all methods are actions 

export default userSlice.reducer;