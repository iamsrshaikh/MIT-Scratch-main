import { combineReducers } from "redux";
import  eventReducer  from "./events/eventSlice";
import  listReducer  from "./midarea/listSlice";
import characterReducer from "./character/characterSlice";

export const rootReducer = combineReducers({
  character: characterReducer,
  list: listReducer,
  event: eventReducer,
});
