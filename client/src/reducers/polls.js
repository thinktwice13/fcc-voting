import {
  FETCH_POLLS,
  DELETE_POLL,
  RESET_ME,
  SUBMIT_POLL,
  SUBMIT_OPTION,
  SET_VOTE,
  REMOVE_OPTION
} from "../actions/types"
import { getUpdatedVote, removeOption, addOption } from "../utils/helpers"

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_POLLS:
      return action.payload
    case SUBMIT_POLL:
      return [action.payload, ...state.slice()]
    case DELETE_POLL:
      //get index of the poll to be deleted
      const i = state.findIndex(poll => poll._id === action.payload)
      return [...state.slice(0, i), ...state.slice(i + 1)]
    case SET_VOTE:
      return getUpdatedVote(state, action.payload)
    case REMOVE_OPTION:
      return removeOption(state, action.payload)
    case SUBMIT_OPTION:
      return addOption(state, action.payload)
    default:
      return state
  }
}
