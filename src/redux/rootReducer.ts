import { combineReducers } from "redux";
import selectSlice from "./slices/selectSlice";
import errorSlice from "./slices/errorSlice";
import itemsSlice from "./slices/itemsSlice";

const rootReducer = combineReducers({
  errorSlice,
  selectSlice,
  itemsSlice,
});

export default rootReducer;
