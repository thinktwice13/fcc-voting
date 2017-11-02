import { combineReducers } from "redux"
import user from "./user"
import polls from "./polls"
import visibility from "./visibility"
import loading from "./loading"
import { reducer as form } from "redux-form"

export default combineReducers({
  loading, // Used for loader visibility during async actions
  user, // Contains user object {auth, id}
  visibility, // Contains {filter, sort, search} states
  polls, // Array of polls
  form // New poll form and new poll option form states
})
