import axios from "axios"
import {
  LOADING,
  FETCH_USER,
  SUBMIT_POLL,
  FETCH_POLLS,
  FETCH_DETAILS,
  DELETE_POLL,
  SET_FILTER,
  SET_SORT,
  SET_SEARCH,
  RESET_DETAILS,
  SET_VOTE,
  SUBMIT_OPTION,
  RESET_POLL_FORM,
  REMOVE_OPTION
} from "./types"
import { reset } from "redux-form"

//async actions
const load = () => dispatch => dispatch({ type: LOADING })

export const fetchUser = () => async dispatch => {
  load()
  const res = await axios.get("/api/user")
  dispatch({
    type: FETCH_USER,
    payload: res.data
  })
}

export const submitPoll = (values, history) => async dispatch => {
  load()
  const res = await axios.post("/api/polls", values)
  history.push("/polls")
  dispatch({
    type: SUBMIT_POLL,
    payload: res.data
  })
  dispatch(reset("newPollForm"))
}

export const submitOption = (pollId, label) => async dispatch => {
  load()
  const res = await axios.put("/api/polls/" + pollId, { label })
  dispatch({
    type: SUBMIT_OPTION,
    payload: res.data
  })
  dispatch(reset("newOptionForm"))
}

export const removeOption = optionId => dispatch => {
  axios.put("/api/options/" + optionId)
  dispatch({
    type: REMOVE_OPTION,
    payload: optionId
  })
}

export const fetchPolls = () => async dispatch => {
  load()
  const res = await axios.get("/api/polls")
  dispatch({
    type: FETCH_POLLS,
    payload: res.data
  })
}

export const deletePoll = pollId => dispatch => {
  axios.delete("/api/polls/" + pollId)
  dispatch({
    type: DELETE_POLL,
    payload: pollId
  })
}

export const fetchDetails = pollId => async dispatch => {
  load()
  const res = await axios.get("/api/polls/view/" + pollId)
  dispatch({
    type: FETCH_DETAILS,
    payload: res.data
  })
}

export const setVote = (optionId, userId) => dispatch => {
  axios.put("/api/vote/" + optionId)
  dispatch({
    type: SET_VOTE,
    payload: { userId, optionId }
  })
}

//UI actions

export const resetDetails = () => dispatch => {
  dispatch({ type: RESET_DETAILS })
}

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
