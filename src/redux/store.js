import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';
import rootReducer from "./rootReducer";
import logger from "redux-logger";

const middleware = [thunkMiddleware, logger];

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(...middleware)
});


export default store;
