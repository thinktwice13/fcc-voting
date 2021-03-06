import axios from "axios"
import { reset } from "redux-form"
import {
  LOADING,
  SUCCESS,
  FETCH_USER,
  SUBMIT_POLL,
  FETCH_POLLS,
  FETCH_DETAILS,
  DELETE_POLL,
  SET_FILTER,
  SET_SORT,
  SET_SEARCH,
  SET_VOTE,
  SUBMIT_OPTION,
  RESET_POLL_FORM,
  REMOVE_OPTION
} from "./types"

/**
 * ASYNC ACTIONS 
 * UI changes that don't require database ID's don't wait for async actions to complete.
 */

export const fetchUser = () => async dispatch => {
  dispatch({ type: LOADING })
  dispatch({
    type: FETCH_USER,
    payload: (await axios.get("/api/user")).data
  })
}

// Use history param to redirect to /polls after new poll submit
export const submitPoll = (values, history) => async dispatch => {
  dispatch({ type: LOADING })
  dispatch(reset("newPollForm"))
  dispatch({
    type: SUBMIT_POLL,
    payload: (await axios.post("/api/polls", values)).data
  })
  history.push("/polls")
}

export const submitOption = (pollId, label) => async dispatch => {
  dispatch({ type: LOADING })
  dispatch(reset("newOptionForm"))
  dispatch({
    type: SUBMIT_OPTION,
    payload: {
      pollId,
      option: (await axios.put("/api/polls/" + pollId, { label })).data
    }
  })
  dispatch(reset("newOptionForm"))
}

export const removeOption = optionId => async dispatch => {
  dispatch({
    type: REMOVE_OPTION,
    payload: optionId
  })

  dispatch({ type: LOADING })
  await axios
    .put("/api/options/" + optionId)
    .then(() => dispatch({ type: SUCCESS }))
}

export const fetchPolls = () => async dispatch => {
  dispatch({ type: LOADING })
  dispatch({
    type: FETCH_POLLS,
    payload: (await axios.get("/api/polls")).data
  })
}

export const deletePoll = pollId => async dispatch => {
  dispatch({
    type: DELETE_POLL,
    payload: pollId
  })

  dispatch({ type: LOADING })
  await axios
    .delete("/api/polls/" + pollId)
    .then(() => dispatch({ type: SUCCESS }))
}

export const fetchDetails = pollId => async dispatch => {
  dispatch({ type: LOADING })
  dispatch({
    type: FETCH_DETAILS,
    payload: (await axios.get("/api/polls/view/" + pollId)).data
  })
}

export const setVote = (optionId, userId) => async dispatch => {
  dispatch({
    type: SET_VOTE,
    payload: { userId, optionId }
  })

  dispatch({ type: LOADING })
  await axios
    .put("/api/vote/" + optionId)
    .then(() => dispatch({ type: SUCCESS }))
}

// UI ACTIONS (filter, sort, search, form reset)

export const resetPollForm = () => dispatch => {
  dispatch({ type: RESET_POLL_FORM })
  dispatch(reset("newPollForm"))
}

export const setFilter = filter => dispatch => {
  dispatch({
    type: SET_FILTER,
    payload: filter
  })
}

export const setSort = direction => dispatch => {
  dispatch({
    type: SET_SORT,
    payload: direction
  })
}

export const setSearch = phrase => dispatch => {
  dispatch({
    type: SET_SEARCH,
    payload: phrase
  })
}
