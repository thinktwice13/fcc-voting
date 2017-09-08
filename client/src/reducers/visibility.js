import { FILTER_OPTIONS, SORT_OPTIONS } from "../utils/constants"
import { SET_FILTER, SET_SORT, SET_SEARCH } from "../actions/types"

const defaultVisibility = {
  filter: FILTER_OPTIONS.SHOW_ALL,
  sort: SORT_OPTIONS.NEWEST,
  search: ""
}

export default (state = defaultVisibility, action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
        search: action.payload === FILTER_OPTIONS.SHOW_ALL ? "" : state.search
      }
    case SET_SORT:
      return {
        ...state,
        sort: action.payload
      }
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload
      }
    default:
      return state
  }
}
