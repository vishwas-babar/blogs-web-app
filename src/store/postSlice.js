import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    id: nanoid(),
    title: "this is title", 
    content: "this is the content",
    coverImage: "coverImage url",
    status: "active",
}

export const postSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addPost: (state, action) => {}, // add reducer function here
        deletePost: (state, action) => {}
    }
})


export const { addPost, deletePost } = postSlice.actions;

export default postSlice.reducer;