import { configureStore } from "@reduxjs/toolkit";
import bugReducer from "./features/bugSlice";

export default configureStore({
  reducer: {
    bug: bugReducer,
  },
});
