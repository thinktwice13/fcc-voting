import {
  FETCH_DETAILS,
  RESET_ME,
  SET_VOTE,
  SUBMIT_OPTION,
  REMOVE_OPTION
} from "../actions/types"
import { getUpdatedVote } from "../utils/helpers"

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_DETAILS:
      return action.payload || false
    case SET_VOTE:
      return {
        ...state,
        options: getUpdatedVote(state, action.payload)
      }
    case SUBMIT_OPTION:
      //find index of the poll to be updated
      return {
        ...state,
        options: [...state.options.slice(), action.payload]
      }
    case REMOVE_OPTION:
      let options = state.options.slice()
      const i = options.findIndex(opt => opt._id === action.payload)
      options.splice(i, 1)
      return {
        ...state,
        options
      }
    case RESET_ME:
      return null
    default:
      return state
  }
}
