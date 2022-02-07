import { combineReducers } from "redux";

import auth from "./auth";
import memory from "./memory";

export default combineReducers({
  memory,
  auth,
});
