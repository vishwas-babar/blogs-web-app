import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice.js";
import userReducer from "./userSlice.js";

const store =  configureStore({
    reducer: postReducer
})

export default store;