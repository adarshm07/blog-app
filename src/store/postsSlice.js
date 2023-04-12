import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
  singlePost: {
    title: "",
    description: "",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.singlePost = action.payload;
    },
    allPosts: (state, action) => {
      state.allPosts = action.payload;
    },
  },
});

export const { allPosts } = postsSlice.actions;

export default postsSlice.reducer;
