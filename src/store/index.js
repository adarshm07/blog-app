import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import userReducer from "./userSlice";
import categorySlice from "./categorySlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
    categories: categorySlice,
  },
});
