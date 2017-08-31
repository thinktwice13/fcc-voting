import { FETCH_POLLS } from "../actions/types"

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_POLLS:
      return action.payload || false
    default:
      return state
  }
}
