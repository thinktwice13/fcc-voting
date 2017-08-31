import { combineReducers } from "redux"
import user from "./user"
import { reducer as form } from "redux-form"

export default combineReducers({
  user,
  form
})
