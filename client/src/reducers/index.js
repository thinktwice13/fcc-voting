import { combineReducers } from "redux"
import user from "./user"
import polls from "./polls"
import details from "./details"
import visibility from "./visibility"
import loading from "./loading"
import { reducer as form } from "redux-form"

export default combineReducers({
  loading,
  user,
  visibility,
  polls,
  details,
  form
})
