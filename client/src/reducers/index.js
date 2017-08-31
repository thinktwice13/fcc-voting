import { combineReducers } from "redux"
import user from "./user"
import { reducer as pollNew } from "redux-form"

export default combineReducers({
  user,
  form: pollNew
})
