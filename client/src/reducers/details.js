import { FETCH_DETAILS, RESET_DETAILS } from "../actions/types"

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_DETAILS:
      return action.payload || false
    case RESET_DETAILS:
      return null
    default:
      return state
  }
}
