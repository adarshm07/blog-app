import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import postsReducer from "./postsSlice";
import userReducer from "./userSlice";
import categorySlice from "./categorySlice";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  posts: postsReducer,
  user: userReducer,
  categories: categorySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
