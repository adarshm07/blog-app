import { combineReducers } from "redux"
import {promotion} from "./users/reducer"
import {alert} from "./users/reducer"
import Auth from "./auth/reducer"
const rootReducer = combineReducers({
  promotion,
  alert,
  Auth
});
export default rootReducer
