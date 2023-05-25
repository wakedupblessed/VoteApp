import { combineReducers, configureStore } from "@reduxjs/toolkit";
import questionSlice from "./questionSlice";

const roootReducer = combineReducers({
  questions: questionSlice,
});

export const store = configureStore({
  reducer: roootReducer,
});
