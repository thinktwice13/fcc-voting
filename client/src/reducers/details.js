import { FETCH_DETAILS, RESET_DETAILS, SET_VOTE } from "../actions/types"
import { getNewVote } from "../utils/helpers"

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_DETAILS:
      return action.payload || false
    case SET_VOTE:
      return {
        ...state,
        options: getNewVote(state, action.payload)
      }
    case RESET_DETAILS:
      return null
    default:
      return state
  }
}
