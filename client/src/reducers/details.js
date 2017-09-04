import {
  FETCH_DETAILS,
  RESET_DETAILS,
  SET_VOTE,
  SUBMIT_OPTION
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
    case RESET_DETAILS:
      return null
    default:
      return state
  }
}
