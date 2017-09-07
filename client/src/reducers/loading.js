import { LOADING } from "../actions/types"

export default (state = true, action) => {
  switch (action.type) {
    case LOADING:
      return true
    default:
      return false
  }
}
