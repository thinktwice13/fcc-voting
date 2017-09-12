import { combineReducers } from "redux"
import user from "./user"
import polls from "./polls"
import visibility from "./visibility"
import loading from "./loading"
import { reducer as form } from "redux-form"

export default combineReducers({
  loading,
  user,
  visibility,
  polls,
  form
})
