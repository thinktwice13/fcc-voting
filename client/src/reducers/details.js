import { FETCH_DETAILS } from "../actions/types"

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_DETAILS:
      return action.payload || false
    default:
      return state
  }
}
