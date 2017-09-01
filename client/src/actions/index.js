import axios from "axios"
import {
  FETCH_USER,
  SUBMIT_POLL,
  FETCH_POLLS,
  FETCH_DETAILS,
  DELETE_POLL,
  SET_FILTER,
  SET_SORT,
  SET_SEARCH,
  RESET_DETAILS,
  SET_VOTE
} from "./types"

//async actions

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/user")
  dispatch({
    type: FETCH_USER,
    payload: res.data
  })
}

export const submitPoll = (values, history) => async dispatch => {
  const res = await axios.post("/api/polls", values)
  history.push("/polls")
  dispatch({
    type: SUBMIT_POLL,
    payload: res.data
  })
}

export const fetchPolls = () => async dispatch => {
  const res = await axios.get("/api/polls")
  dispatch({
    type: FETCH_POLLS,
    payload: res.data
  })
}

export const deletePoll = pollId => async dispatch => {
  const res = await axios.delete("/api/polls/" + pollId)
  dispatch({
    type: DELETE_POLL,
    payload: pollId
  })
}

export const fetchDetails = pollId => async dispatch => {
  const res = await axios.get("/api/polls/view/" + pollId)
  dispatch({
    type: FETCH_DETAILS,
    payload: res.data
  })
}

export const setVote = (optionId, userId) => dispatch => {
  axios.put("/api/polls/vote/" + optionId)
  dispatch({
    type: SET_VOTE,
    payload: { userId, optionId }
  })
}

//UI actions

export const resetDetails = () => dispatch => {
  dispatch({ type: RESET_DETAILS })
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
