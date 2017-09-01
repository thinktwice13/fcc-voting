import { combineReducers } from "redux"
import user from "./user"
import polls from "./polls"
import details from "./details"
import visibility from "./visibility"
import { reducer as form } from "redux-form"

export default combineReducers({
  user,
  visibility,
  polls,
  details,
  form
})
