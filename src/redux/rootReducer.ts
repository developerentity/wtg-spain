import { combineReducers } from "redux";
import selectSlice from "./slices/selectSlice";
import itemsSlice from "./slices/itemsSlice";

const rootReducer = combineReducers({
  selectSlice,
  itemsSlice,
});

export default rootReducer;
