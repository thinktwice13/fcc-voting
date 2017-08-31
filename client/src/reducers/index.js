import { combineReducers } from "redux"
import user from "./user"
import polls from "./polls"
import { reducer as form } from "redux-form"

export default combineReducers({
  user,
  polls,
  form
})
