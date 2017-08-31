import { FETCH_POLLS, DELETE_POLL } from "../actions/types"
import { SET_FILTER, SET_SORT, SET_SEARCH } from "../actions/types"
import { getFilteredList } from "../utils/helpers"

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_POLLS:
      return action.payload || false
    case DELETE_POLL:
      //get index of the polls to be deleted
      const i = state.findIndex(poll => poll._id === action.payload)
      return [...state.slice(0, i), ...state.slice(i + 1)]
    case SET_FILTER:
    case SET_SEARCH:
      return getFilteredList(state, action.payload)
    default:
      return state
  }
}
