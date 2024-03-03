import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    id: nanoid(),
    title: "this is title", 
    content: "this is the content",
    coverImageUrl: "coverImage url",
    coverImageId: "coverimage id",
    status: "active",
}

export const postSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addPost: (state, action) => {}, // add reducer function here
        deletePost: (state, action) => {},
        updatePost: (state, action) => {}
    }
})


export const { addPost, deletePost, updatePost } = postSlice.actions;

export default postSlice.reducer;