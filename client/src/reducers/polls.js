import {
  FETCH_POLLS,
  DELETE_POLL,
  RESET_ME,
  SUBMIT_POLL
} from "../actions/types"

export default (state = null, action) => {
  switch (action.type) {
    case RESET_ME:
      return null
    case FETCH_POLLS:
      return action.payload || null
    case DELETE_POLL:
      //get index of the poll to be deleted
      const i = state.findIndex(poll => poll._id === action.payload)
      return [...state.slice(0, i), ...state.slice(i + 1)]
    case SUBMIT_POLL:
      return [action.payload, ...state]
    default:
      return state
  }
}
